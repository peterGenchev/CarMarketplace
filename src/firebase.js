import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getDatabase , ref, push } from 'firebase/database';
import { useState, useEffect } from 'react';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCq__RU1ijXD3xcNLK_RBJJcGaqT3bnFCs",
  authDomain: "carmarketplace-9e4fb.firebaseapp.com",
  databaseURL: "https://carmarketplace-9e4fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carmarketplace-9e4fb",
  storageBucket: "carmarketplace-9e4fb.appspot.com",
  messagingSenderId: "799233853538",
  appId: "1:799233853538:web:92be15ebd9bf18f4ec693b",
  measurementId: "G-VEES95BC0T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app); 


export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('Registration successful');
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Use onAuthStateChanged to update the currentUser state when the authentication state changes
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { currentUser };
};

export { auth, signOut, firestore, getAuth, database   };
export default app;