/** Aquí va el Modelo MySQL para interactuar con la base relacional */

// backend/models/sqlModel.js

const connection = require('../config/mysqlConfig.js');

// Función para obtener todos los datos de la tabla 'vuelos'
const fetchData = (callback) => {
  const query = 'SELECT * FROM vuelos';
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error obteniendo datos:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para agregar un nuevo vuelo a la tabla 'vuelos'
const addData = (origen, destino, fecha, hora, asientosDisponibles, callback) => {
  const query = 'INSERT INTO vuelos (origen, destino, fecha, hora, asientos_disponibles) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [origen, destino, fecha, hora, asientosDisponibles], (error, results) => {
    if (error) {
      console.error("Error agregando vuelo:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para eliminar un vuelo de la tabla 'vuelos' por ID
const deleteData = (id, callback) => {
  const query = 'DELETE FROM vuelos WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error eliminando vuelo:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Función para actualizar los datos de un vuelo en la tabla 'vuelos' por ID
const updateData = (id, origen, destino, fecha, hora, asientosDisponibles, callback) => {
  const query = 'UPDATE vuelos SET origen = ?, destino = ?, fecha = ?, hora = ?, asientos_disponibles = ? WHERE id = ?';
  connection.query(query, [origen, destino, fecha, hora, asientosDisponibles, id], (error, results) => {
    if (error) {
      console.error("Error actualizando vuelo:", error);
      return callback(error);
    }
    callback(null, results);
  });
};

// Exportar las funciones para que puedan ser usadas en otros módulos
module.exports = {
  fetchData,
  addData,
  deleteData,
  updateData
};
