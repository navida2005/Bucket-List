import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAPqGpnNZE-M4I3UymcuxThBVVGT-lkAK8",
  authDomain: "bucketlist-e295c.firebaseapp.com",
  projectId: "bucketlist-e295c",
  storageBucket: "bucketlist-e295c.appspot.com",
  messagingSenderId: "886709095429",
  appId: "1:886709095429:web:224add99bd532e2540e06c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase utilities
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
