var mysql = require('mysql');
var config = require("config");
var connection = mysql.createConnection(config.db.mysql);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err;
  console.log("The test query returned a positive result. Db connection is working");
});

connection.queryP = function (sql, arr) {
  return new Promise((resolve, reject) => {
    connection.query(sql,arr, function (err, rows, fields) {
      if (err) {
        console.log(err)
        reject(err);
      }
      resolve(rows)
    });
  });
}

module.exports = connection;