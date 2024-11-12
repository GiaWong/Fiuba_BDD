// Aquí va la logica CRUD

const { fetchData, addData, deleteData, updateData } = require('../models/sqlModel');

// Función para obtener todos los datos de la tabla 'vuelos'
export const fetchDataFromMySQL = async () => {
  return new Promise((resolve, reject) => {
    fetchData((error, results) => {
      if (error) {
        console.error("Error obteniendo datos:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Función para añadir un vuelo
export const handleAddToMySQL = async (origen, destino, fecha, hora, asientosDisponibles) => {
  return new Promise((resolve, reject) => {
    if (origen.trim() && destino.trim() && fecha.trim() && hora.trim() && asientosDisponibles.trim()) {
      addData(origen, destino, fecha, hora, parseInt(asientosDisponibles), (error) => {
        if (error) {
          console.error("Error agregando vuelo:", error);
          reject(error);
        } else {
          resolve({ message: 'Vuelo añadido con éxito' });
        }
      });
    } else {
      reject("Todos los campos son requeridos.");
    }
  });
};

// Función para borrar un vuelo
export const handleDeleteFromMySQL = async (id) => {
  return new Promise((resolve, reject) => {
    deleteData(id, (error) => {
      if (error) {
        console.error("Error eliminando vuelo:", error);
        reject(error);
      } else {
        resolve({ message: 'Vuelo eliminado con éxito' });
      }
    });
  });
};

// Función para actualizar un vuelo
export const handleUpdateInMySQL = async (id, origen, destino, fecha, hora, asientosDisponibles) => {
  return new Promise((resolve, reject) => {
    if (origen.trim() && destino.trim() && fecha.trim() && hora.trim() && asientosDisponibles.trim()) {
      updateData(id, origen, destino, fecha, hora, parseInt(asientosDisponibles), (error) => {
        if (error) {
          console.error("Error actualizando vuelo:", error);
          reject(error);
        } else {
          resolve({ message: 'Vuelo actualizado con éxito' });
        }
      });
    } else {
      reject("Todos los campos son requeridos.");
    }
  });
};
