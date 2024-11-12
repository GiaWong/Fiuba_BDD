// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhYYuitorjDvnZXlfyVj_I2JbMVe6d5vE",
  authDomain: "tp-bd-merlino.firebaseapp.com",
  projectId: "tp-bd-merlino",
  storageBucket: "tp-bd-merlino.firebasestorage.app",
  messagingSenderId: "116391928915",
  appId: "1:116391928915:web:409d0822afcc09e8e692a6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Obtener la instancia de Firestore

export { db };
