var roomsManager = require("./roomsManager.js");
var User = require("./User.js");

var UsersManager = function () {
  var users = [];

  this.new = function (socket) {
    var user = new User({socket: socket
      , roomsManager: roomsManager
    });
  
    users.push(user);
  };
};

module.exports = new UsersManager();