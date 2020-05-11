const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'user123',
  password: 'super_s3cur3_Pa55W0rD',
  database: 'amazing_database',
  debug: false
});

// const executeQuery = (query, callback) => {
//   pool.getConnection((err, connection) => {
//     if (err) return callback(err, null);
//
//     connection.query(query, (err, rows, fields) => {
//       connection.release();
//
//       if (err) return callback(err, null);
//
//       return new Promise(callback(null, rows));
//     });
//   });
//
//   return callback(true, "No Connection");
// };

const executeQuery = async (query) => {
  let _rows = [];
  await pool.getConnection(async (err, connection) => {
    if (err) throw err;

    console.log("getting connection");

     await connection.query(query, (err, rows, fields) => {
      connection.release();
      console.log("released connection");

      if (err) return new Promise(() => "error");

      _rows = rows;
    });
  });

  console.log("returning promise");
  return new Promise((res, rej) => res(_rows));
};

module.exports = {
  executeQuery
};
