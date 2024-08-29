// src/Home.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase_config";
import { useNavigate } from "react-router-dom";
import BucketList from "./BucketList";
import "./App.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getName = (email) => {
    if (email === process.env.REACT_APP_PERSON1_EMAIL) {
        return process.env.REACT_APP_PERSON1_NAME;
    } else if (email === process.env.REACT_APP_PERSON2_EMAIL) {
        return process.env.REACT_APP_PERSON2_NAME;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <>
      <div className="home-container">
        {user && <div className="home-welcome">Hello {getName(user.email)}!!</div>}
        <button className="logout" onClick={() => auth.signOut()}>Log Out</button>
      </div>
      <BucketList />
    </>
  );
};

export default Home;
