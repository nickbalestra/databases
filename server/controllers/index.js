var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body.message;
      var roomName = req.body.roomName;
      var userName = req.body.userName;
      models.messages.post(message, userName, roomName, res);
    } // a function which handles posting a message to the database models.get()
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var userName = req.body.userName;
      models.users.post(userName, res);
    }
  }
};

