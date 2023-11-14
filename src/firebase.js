// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHhNPOFQz-HlB8QcRFU2ZryFO8XafBhJg",
  authDomain: "reactapp-db960.firebaseapp.com",
  projectId: "reactapp-db960",
  storageBucket: "reactapp-db960.appspot.com",
  messagingSenderId: "368264839083",
  appId: "1:368264839083:web:dc3b1ced01f6a9f5565cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
