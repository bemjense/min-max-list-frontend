// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
//import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import firebase from 'firebase/app';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3BMBI9I9Jj6QUvQkyh9quttuLWbFUbRQ",
  authDomain: "min-max-list.firebaseapp.com",
  projectId: "min-max-list",
  storageBucket: "min-max-list.appspot.com",
  messagingSenderId: "267782539417",
  appId: "1:267782539417:web:5c9472ec0748142639d008",
  measurementId: "G-8KSRE4VHQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('no user!');
    }
})

const registerUser = async (email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  };
  
  const loginUser = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };
  