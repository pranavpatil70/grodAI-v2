import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDV5HH28CrTr2uCWbIT08fhPxHHzg0ard8",
  authDomain: "signup-api-f104b.firebaseapp.com",
  databaseURL: "https://signup-api-f104b-default-rtdb.firebaseio.com",
  projectId: "signup-api-f104b",
  storageBucket: "signup-api-f104b.firebasestorage.app",
  messagingSenderId: "665757733610",
  appId: "1:665757733610:web:d86ce29ddf927f35283d93"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 