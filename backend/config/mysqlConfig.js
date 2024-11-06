/**Aquí va la configuración para conectarse a MySQL */

const mysql = require('mysql');

/** Usaremos el Freesqldatabase.com Este servicio ofrece MySQL gratuito en la nube */
const connection = mysql.createConnection({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10743024',
  password: 'gCPMhUzaT3',
  database: 'sql10743024',
  port: 3306
});

module.exports = connection;
