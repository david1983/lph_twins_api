var mysql      = require('mysql');
var config = require("config");
var connection = mysql.createConnection(config.db.mysql);
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err; 
  console.log("The test query returned a positive result. Db connection is working");
});

module.exports = connection;