// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVsixMWs-yfSaOOT4AMR2SF7R9tWID_XY",
  authDomain: "quizmebro-jee.firebaseapp.com",
  projectId: "quizmebro-jee",
  storageBucket: "quizmebro-jee.firebasestorage.app",
  messagingSenderId: "754559691066",
  appId: "1:754559691066:web:4ea213f33005849c758803",
  measurementId: "G-PR9G88LRTM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
