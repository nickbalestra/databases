var db = require('../db');




module.exports = {
  messages: {
    get: function (res) {
      db.connection.query( 'SELECT * from messages', function(err, rows){
        if (err){
          console.log(err);
        } else {
          var response = {};
          response.results = rows;
          res.end(JSON.stringify(response));
        }
      });
    }, // a function which produces all the messages
    post: function (message, userName, roomName, res) {
      var timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

      db.connection.query('SELECT * from users where userName =?', [userName], function(err, rows){
        console.log(rows);
        if (rows.length === 0){
          db.connection.query('INSERT INTO users SET ?', {userName: userName}, function(err){
            if (err){
              console.log(err);
            } else {
              console.log("Added User");
              // we now write the message in db
              db.connection.query(
                'INSERT INTO messages SET ?',
                {message: message, userName: userName, roomName: roomName, createdAt: timeStamp},
                function(err){
                  if (err){
                    console.log(err);
                  } else {
                   res.end('Success!');
                  }
              });
            }
          });
        }
        db.connection.query(
          'INSERT INTO messages SET ?',
          {message: message, userName: userName, roomName: roomName, createdAt: timeStamp},
          function(err){
            if (err){
              console.log(err);
            } else {
              res.end('Success!');
            }
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (res) {
      db.connection.query( 'SELECT * from users', function(err, rows){
        if (err){
          console.log(err);
        } else {
          var response = {};
          response.results = rows;
          res.end(JSON.stringify(response));
        }
      });
    },
    post: function (userName, res) {

      db.connection.query('INSERT INTO users SET ?', {userName: userName} ,function(err){
        if (err){
          console.log(err);
        } else {
          res.end('Success!');
        }
      });

    }
  }
};
