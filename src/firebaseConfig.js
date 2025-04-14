// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "dh2642-29c50.firebaseapp.com",
  projectId: "dh2642-29c50",
  storageBucket: "dh2642-29c50.firebasestorage.app",
  messagingSenderId: "389069809164",
  appId: "1:389069809164:web:eb9eb7fba4aab24fb33029",
  measurementId: "G-JMBEQCV08T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { firebaseConfig, app };
