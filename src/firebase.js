import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-zAwGH3r5JZbWSmM-wxCg1OJqpt66lMA",
  authDomain: "portfolioevans-a92e4.firebaseapp.com",
  projectId: "portfolioevans-a92e4",
  storageBucket: "portfolioevans-a92e4.firebasestorage.app",
  messagingSenderId: "856746897211",
  appId: "1:856746897211:web:4e7bf7336abef66b33d11e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export pour utiliser dans AdminLogin
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
