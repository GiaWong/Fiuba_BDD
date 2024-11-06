/** Aquí va el Modelo MySQL para interactuar con la base relacional */

const connection = require('backend/config/mysqlConfig.js');  // Ajustar la ruta si es necesario

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL: ', err.code);  // imprimir el código de error
      console.error('Mensaje del error: ', err.message);
      return;
    }
    console.log('Conexión exitosa a MySQL');
  
    // Consulta para probar la conexión y obtener los datos de alguna tabla vacia
    connection.query('SHOW TABLES', (error, results) => {
      if (error) throw error;
      console.log('Tablas en la base de datos:', results);
    });
  });