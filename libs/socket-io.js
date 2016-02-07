var socketio = require("socket.io");
var usersManager = require("./usersManager.js");

module.exports = function (server) {
  var io = socketio.listen(server);
  io.on('connection', usersManager.new);
};