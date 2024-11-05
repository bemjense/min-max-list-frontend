import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyD3BMBI9I9Jj6QUvQkyh9quttuLWbFUbRQ",
  authDomain: "min-max-list.firebaseapp.com",
  projectId: "min-max-list",
  storageBucket: "min-max-list.firebasestorage.app",
  messagingSenderId: "267782539417",
  appId: "1:267782539417:web:5c9472ec0748142639d008",
  measurementId: "G-8KSRE4VHQ1"
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
