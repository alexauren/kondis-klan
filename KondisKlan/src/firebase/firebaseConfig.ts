// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKJaYG1in4qFsVaegNxlQ8dSNQA46zNRI",
  authDomain: "kondisklan.firebaseapp.com",
  projectId: "kondisklan",
  storageBucket: "kondisklan.appspot.com",
  messagingSenderId: "619368884066",
  appId: "1:619368884066:web:cdc8077191b8c35fa16e3b",
  measurementId: "G-RGXJ40MY0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);