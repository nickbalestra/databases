var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the datxxec"cxpohat".

exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
});
