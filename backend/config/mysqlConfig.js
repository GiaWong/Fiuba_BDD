/**Aquí va la configuración para conectarse a MySQL */

// backend/config/mysqlConfig.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10743024',
  password: 'gCPMhUzaT3',
  database: 'sql10743024',
  port: 3306
});

// Conectar a la base de datos
function connectWithRetry() {
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL:', err.message);
      console.log('Reintentando conexión en 5 segundos...');
      setTimeout(connectWithRetry, 5000); // Reintentar en 5 segundos
    } else {
      console.log('Conexión exitosa a MySQL');
    }
  });
}

connectWithRetry();

// Manejar errores en la conexión en ejecución
connection.on('error', (err) => {
  console.error('Error en la conexión MySQL:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconectando a MySQL...');
    connectWithRetry(); // Intentar reconectar si la conexión se pierde
  } else {
    throw err;
  }
});

module.exports = connection;

