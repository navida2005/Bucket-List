import React, { useState } from "react";
import { auth } from "./firebase_config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./App.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password")
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        handleLogin();
    }
};

  return (
    <div className="login-container">
        <div className="form-container">
            <div className="login-head">Login</div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                onKeyPress={handleKeyPress}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                onKeyPress={handleKeyPress}
            />
            {error && <div className="error-message">{error}</div>}
            <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
    </div>
  );
};

export default Login;

