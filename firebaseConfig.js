// Firebase configuración con módulos ES6 y sin analytics
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMwNZ7r8Vyx0LicAEWdiitdIhXsncB84g",
  authDomain: "labsuprl.firebaseapp.com",
  databaseURL: "https://labsuprl-default-rtdb.firebaseio.com",
  projectId: "labsuprl",
  storageBucket: "labsuprl.firebasestorage.app",
  messagingSenderId: "380634406494",
  appId: "1:380634406494:web:1e6295708f49606a59decf",
  measurementId: "G-FVSNW7XL3P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
