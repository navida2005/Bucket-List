import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase_config";
import { addDoc, collection, serverTimestamp, onSnapshot, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import "./App.css";

const Message = () => {

    const [newMessage ,setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

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
            } 
        });
    
        return unsubscribe;
      }, []);

    const addMessage = async () => {
        if (!newMessage) {
            return;
        }
        await addDoc(collection(db, "cutemessage"), {
            message: newMessage,
            sender: getName(user.email),
            timestamp: serverTimestamp(),
        });

        setNewMessage("");
    }

    const getMessage = async () => {
        const unsubscribe = onSnapshot(query(collection(db, "cutemessage"),orderBy("timestamp", "desc")), (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    message: doc.data().message,
                    sender: doc.data().sender,
                }))
            );
        });

        return () => unsubscribe();
    };

    useEffect(() => {
        getMessage();
    }, []);

    const deleteBucketItem = async (id) => {
        const itemRef = doc(db, "cutemessage", id);
        await deleteDoc(itemRef);
    };

    return(
        <div className="message-container">
            <h1 className="message-head">♡Notice♡</h1>
            {messages.length !== 0 ? (messages.map((message) => (
                <div className="message-tile" key={message.id}>
                    <div className="message-left">
                        <h2 className="message-sender">From {message.sender}</h2>
                        <p className="message-content">{message.message}</p>
                    </div>
                    <div className="message-right">
                        <button className="message-close" onClick={() => (deleteBucketItem(message.id))} >⛌</button>
                    </div>
                </div>
            ))) : (
                <div className="message-input">
                    <textarea
                        placeholder="Type a cute message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="send-message" onClick={addMessage}>
                        Send
                    </button>
                </div>
            )}
        </div>
    );
}

export default Message;

