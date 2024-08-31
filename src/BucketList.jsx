import React, { useEffect, useState } from "react";
import { db } from "./firebase_config";
import "./App.css";
import { addDoc, collection, serverTimestamp, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import bin from "./bin.png";

const BucketList = () => {
    const [listItem, setListItem] = useState([]);
    const [newListItem, setNewListItem] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getBucket();
    }, []);

    const toggleComplete = async (id, completed) => {
        const itemRef = doc(db, "bucketlist", id);
        await updateDoc(itemRef, {
            completed: !completed,
        });
    };

    const getBucket = async () => {
        const unsubscribe = onSnapshot(query(collection(db, "bucketlist"),orderBy("timestamp", "desc")), (snapshot) => {
            setListItem(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    item: doc.data().item,
                    completed: doc.data().completed,
                }))
            );
        });

        return () => unsubscribe();
    };

    const addBucket = async () => {
        if (!newListItem) {
            setIsModalOpen(false);
            return;
        }
        await addDoc(collection(db, "bucketlist"), {
            item: newListItem,
            completed: false,
            timestamp: serverTimestamp(),
        });

        setNewListItem("");
        setIsModalOpen(false); // Close the modal after adding
    };

    const deleteBucketItem = async (id) => {
        const itemRef = doc(db, "bucketlist", id);
        await deleteDoc(itemRef);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bucket-container">
            <h1 className="bucket-head">Our Bucket List</h1>

            {listItem.length === 0 ? (
                <div className="empty-message">Lets Add Stuff To Our Bucket List... <br /> Life Isn't Fun Without Dreams <br />😉</div>
            ) : (
                listItem.map((bucketItem) => (
                    <div key={bucketItem.id} className="list-tile">
                        <div className="section-left">
                            <div className="title">{bucketItem.item}</div>
                            <div className="completed">{bucketItem.completed ? "High five, partner in crime!  💕" : "Can't wait to do this together! 🥰"}</div>
                        </div>
                        <div className="section-right">
                            <button className="status" onClick={() => toggleComplete(bucketItem.id, bucketItem.completed)}>
                                {bucketItem.completed ? "Undo" : "Yay!"}
                            </button>
                            <img src={bin} onClick={() => deleteBucketItem(bucketItem.id)} alt="bucket" className="bucket-img" />
                        </div>
                    </div>
                ))  
            )}
            <button className="add-main" onClick={handleModalOpen}>+</button>

            {/* Modal Window */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <textarea
                            placeholder="Type your cutest bucket list item here....."
                            value={newListItem}
                            onChange={(e) => setNewListItem(e.target.value)}
                        />
                        <div className="buttons">
                            <button className="add" onClick={addBucket}>Add</button>
                            <button className="close" onClick={handleModalClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BucketList;
