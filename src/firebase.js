import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADAMRSYyGKyci6YW9ocD1wLPhV0qSf7LM",
  authDomain: "chess-react-7933b.firebaseapp.com",
  projectId: "chess-react-7933b",
  storageBucket: "chess-react-7933b.appspot.com",
  messagingSenderId: "1086713377981",
  appId: "1:1086713377981:web:8132bdb4c07df6496a33d4",
  measurementId: "G-NG62MH3TYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase