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
  
  /*this.get = function (username, callback) {
    var found = false;
    for (var i = 0; (i < users.length) || !found; i++) {
      // exception of async rule loop, getName is synchrone !
      users[i].getName(null, function (err, name) {
        if (err) return function () {};
        if (name == username) {
          found = true;
          return callback(null, users[i]);  
        }
      });
    }
    if (found) return ;
    this.create({username: username}, callback);
  };
  
  this.create = function (data, callback) {
    var user = new User({roomsManager: roomsManager});
    user.setName(data.username, function () {});
    user.setSocket(data.socket, function () {});
    users.push(user);
    callback(null, user);
  };*/
};

module.exports = new UsersManager();