// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "md-estate-88a66.firebaseapp.com",
  projectId: "md-estate",
  storageBucket: "md-estate-88a66.appspot.com",
  messagingSenderId: "588742636961",
  appId: "1:588742636961:web:e6b75d400ab8bb87f787e0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);