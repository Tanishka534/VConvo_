// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FirebaseConfig = {
  apiKey: "AIzaSyBB5v2aJ3y6Xi3OfjBCL9DMjt838-u8cx4",
  authDomain: "vconvo-app.firebaseapp.com",
  projectId: "vconvo-app",
  storageBucket: "vconvo-app.appspot.com",
  messagingSenderId: "512101988965",
  appId: "1:512101988965:web:ba97bcb56abb5c0145648c",
  measurementId: "G-DPFN1XSERG"
};

// Initialize Firebase
const app = initializeApp(FirebaseConfig);
// const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app)