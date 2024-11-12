// src/firestoreOperations.js

import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../backend/config/firebaseConfig'; // Importar la instancia de db

// Función para obtener todos los datos de la colección 'vuelos'
export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "vuelos"));
  const dataList = [];
  querySnapshot.forEach((doc) => {
    dataList.push({ id: doc.id, ...doc.data() });
  });
  return dataList;
};

// Función para añadir un vuelo
export const handleAdd = async (origen, destino, fecha, hora, asientosDisponibles) => {
  if (origen.trim() && destino.trim() && fecha.trim() && hora.trim() && asientosDisponibles.trim()) {
    try {
      // Añadir el nuevo vuelo a la colección 'vuelos'
      await addDoc(collection(db, "vuelos"), {
        origen,
        destino,
        fecha,
        hora,
        asientosDisponibles: parseInt(asientosDisponibles),
      });
    } catch (e) {
      console.error("Error agregando vuelo: ", e);
    }
  } else {
    alert("Todos los campos son requeridos.");
  }
};

// Función para borrar un vuelo
export const handleDelete = async (id) => {
  const docRef = doc(db, "vuelos", id);
  try {
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error eliminando vuelo: ", e);
  }
};

// Función para actualizar un vuelo
export const handleUpdate = async (id, origen, destino, fecha, hora, asientosDisponibles) => {
  if (origen.trim() && destino.trim() && fecha.trim() && hora.trim() && asientosDisponibles.trim()) {
    const docRef = doc(db, "vuelos", id);
    try {
      await updateDoc(docRef, {
        origen,
        destino,
        fecha,
        hora,
        asientosDisponibles: parseInt(asientosDisponibles),
      });
    } catch (e) {
      console.error("Error actualizando vuelo: ", e);
    }
  } else {
    alert("Todos los campos son requeridos.");
  }
};
