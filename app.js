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
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Elementos UI
const loginSection = document.getElementById("login-section");
const mainSection = document.getElementById("main-section");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const toggleBtn = document.getElementById("toggle-btn");
const estadoSpan = document.getElementById("estado");
const historialLista = document.getElementById("historial-lista");

// Referencias Firebase
const estadoRef = ref(db, 'laboratorio/estado');
const historialRef = ref(db, 'laboratorio/historial');

// Mostrar estado actual
onValue(estadoRef, (snapshot) => {
  const estado = snapshot.val();
  estadoSpan.textContent = estado || 'Desconocido';
  toggleBtn.textContent = estado === 'OCUPADO' ? 'Cambiar a LIBRE' : 'Cambiar a OCUPADO';
});

// Mostrar historial
onValue(historialRef, (snapshot) => {
  historialLista.innerHTML = "";

  if (snapshot.exists()) {
    const historial = Object.values(snapshot.val());

    historial.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.usuario} cambió a ${item.estado} el ${item.fecha} a las ${item.hora}`;
      historialLista.appendChild(li);
    });
  }
});

// Cambiar estado y guardar historial
toggleBtn.addEventListener("click", async () => {
  const currentEstado = estadoSpan.textContent;
  const nuevoEstado = currentEstado === 'OCUPADO' ? 'LIBRE' : 'OCUPADO';
  const user = auth.currentUser;
  const now = new Date();
  const fecha = now.toLocaleDateString();
  const hora = now.toLocaleTimeString();

  try {
    // Cambiar estado
    await set(estadoRef, nuevoEstado);

    // Obtener historial actual
    const snapshot = await get(historialRef);
    let historial = [];

    if (snapshot.exists()) {
      historial = Object.values(snapshot.val());
    }

    // Agregar nuevo registro
    historial.unshift({
      usuario: user.email,
      estado: nuevoEstado,
      fecha: fecha,
      hora: hora
    });

    // Dejar solo 3
    historial = historial.slice(0, 3);

    // Guardar historial actualizado
    await set(historialRef, historial);

  } catch (error) {
    alert("Error al actualizar: " + error.message);
  }
});

// Autenticación
registerBtn.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .then(() => alert("Usuario registrado"))
    .catch(err => alert(err.message));
});

loginBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.style.display = 'none';
    mainSection.style.display = 'block';
  } else {
    loginSection.style.display = 'block';
    mainSection.style.display = 'none';
  }
});
