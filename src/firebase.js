import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHhNPOFQz-HlB8QcRFU2ZryFO8XafBhJg",
  authDomain: "reactapp-db960.firebaseapp.com",
  projectId: "reactapp-db960",
  storageBucket: "reactapp-db960.appspot.com",
  messagingSenderId: "368264839083",
  appId: "1:368264839083:web:dc3b1ced01f6a9f5565cee"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export default app; // Corrected export to app
