
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1yEK1llQJrbPzpxvAj-If-pwCEyP0tXM",
  authDomain: "virtual-therapy-4adcc.firebaseapp.com",
  projectId: "virtual-therapy-4adcc",
  storageBucket: "virtual-therapy-4adcc.firebasestorage.app",
  messagingSenderId: "28420154983",
  appId: "1:28420154983:web:87be4f1c33eb2be67b96c2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);