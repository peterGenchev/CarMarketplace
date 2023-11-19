import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHhNPOFQz-HlB8QcRFU2ZryFO8XafBhJg",
  authDomain: "reactapp-db960.firebaseapp.com",
  projectId: "reactapp-db960",
  storageBucket: "reactapp-db960.appspot.com",
  messagingSenderId: "368264839083",
  appId: "1:368264839083:web:dc3b1ced01f6a9f5565cee"
};

export const registerUser = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Registration successful');
  } catch (error) {
    console.error('Registration error:', error.message);
  }
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, getAuth, signOut }; // Export signOut along with other necessary exports
export default app;