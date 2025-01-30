// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDB3VRkmhjHoOd2i1Z7BKoIfGS0UjmhnnM",
  authDomain: "voteeli.firebaseapp.com",
  projectId: "voteeli",
  storageBucket: "voteeli.appspot.com",
  messagingSenderId: "430220325593",
  appId: "1:430220325593:web:31d6aab51563603a4b44c8",
  measurementId: "G-BKHX8TWH9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
