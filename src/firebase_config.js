import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAPqGpnNZE-M4I3UymcuxThBVVGT-lkAK8",
  authDomain: "bucketlist-e295c.firebaseapp.com",
  projectId: "bucketlist-e295c",
  storageBucket: "bucketlist-e295c.appspot.com",
  messagingSenderId: "886709095429",
  appId: "1:886709095429:web:224add99bd532e2540e06c"
};
// Initialize Firebase
const firebaseApp =firebase.initializeApp(firebaseConfig);

// Export Firebase utilities
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
