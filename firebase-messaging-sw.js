// Import and initialize the Firebase SDK
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Deine Firebase-Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyAKr4suek_0T5QzRzTtHUMxuA4Quulk6_k",
  authDomain: "bjl-cinematic-universe.firebaseapp.com",
  projectId: "bjl-cinematic-universe",
  storageBucket: "bjl-cinematic-universe.appspot.com",
  messagingSenderId: "1091318575562",
  appId: "1:1091318575562:web:aa0c594d2ef026f42c9f33"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
