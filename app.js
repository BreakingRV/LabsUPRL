import { auth, db } from './firebaseConfig.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  ref,
  onValue,
  set
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const loginSection = document.getElementById("login-section");
const mainSection = document.getElementById("main-section");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const toggleBtn = document.getElementById("toggle-btn");
const estadoSpan = document.getElementById("estado");

const estadoRef = ref(db, 'laboratorio/estado');

// Escuchar cambios de estado
onValue(estadoRef, (snapshot) => {
  const estado = snapshot.val();
  estadoSpan.textContent = estado || 'Desconocido';
  toggleBtn.textContent = estado === 'OCUPADO' ? 'Cambiar a LIBRE' : 'Cambiar a OCUPADO';
});

// Registro
registerBtn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .then(() => alert("Usuario registrado"))
    .catch(err => alert(err.message));
});

// Login
loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .catch(err => alert(err.message));
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Cambiar estado
toggleBtn.addEventListener("click", () => {
  const current = estadoSpan.textContent;
  const nuevo = current === 'OCUPADO' ? 'LIBRE' : 'OCUPADO';
  set(estadoRef, nuevo);
});

// Autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.style.display = 'none';
    mainSection.style.display = 'block';
  } else {
    loginSection.style.display = 'block';
    mainSection.style.display = 'none';
  }
});
