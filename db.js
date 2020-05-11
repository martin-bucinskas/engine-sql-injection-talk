const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'user123',
  password : 'super_s3cur3_Pa55W0rD',
  database : 'amazing_database'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
