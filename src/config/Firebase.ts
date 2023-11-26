// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYJ-0_IcqmUjcXdDLrJRQN-zwpNH-_N6g",
  authDomain: "react-course-9b91c.firebaseapp.com",
  projectId: "react-course-9b91c",
  storageBucket: "react-course-9b91c.appspot.com",
  messagingSenderId: "587846556351",
  appId: "1:587846556351:web:8feb691bf6cb3319a0440a",
  measurementId: "G-HGK5777XYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db  = getFirestore(app);
