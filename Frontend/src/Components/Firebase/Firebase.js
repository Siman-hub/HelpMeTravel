import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaCh3sUacYt4SsN_WzAE36JBm0s2NH-58",
  authDomain: "login-auth-44a73.firebaseapp.com",
  projectId: "login-auth-44a73",
  storageBucket: "login-auth-44a73.firebasestorage.app",
  messagingSenderId: "545361759079",
  appId: "1:545361759079:web:c6d13fc2507011efa0bdc2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
