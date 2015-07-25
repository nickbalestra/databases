var db = require('../db');




module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (username) {
      console.log(username);

      // console.log(db.connection);
      db.connection.connect(function(err){
        if (err) {console.log(err)};
        console.log('connected');
      });

      db.connection.query('SELECT * FROM users WHERE userName = "Zach"', function(err, rows){
        console.log(rows);
      })
      // db.connnection.query('SELECT * FROM users', function(err, rows, fields) {
      //   console.log('rows :', rows);
      //   console.log('fields :', fields );
      // });

      db.connection.end(function(err){
        if (err) {console.log(err)};
        console.log('disconnected');
      });
    }
  }
};

