var Room = require("./Room.js");

var RoomsManager = function () {
  var rooms = [];
  rooms.push(new Room({roomName: "rainbow"}));
  rooms.push(new Room({roomName: "warrior"}));
  
  this.add = function (roomName) {
    var room = {
      name: roomName
      , users: []
    };
    rooms.push(room);
    return room;
  };
  
  this.remove = function (room) {
    
  };
  
  this.get = function (roomName) {
    var found = false;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].getName() == roomName) {
        found = true;
        break;
      }
    }
    
    if (!found) return this.add(roomName);
    return rooms[i];
  };
  
  this.serializeAllRoom = function () {
    var serializeRooms = [];
    for (var i = 0; i < rooms.length; i++) {
      var room = { roomName: rooms[i].getName()
        , usersNumber: rooms[i].getUsers.length 
      };
      serializeRooms.push(room);
    }
    return serializeRooms;
  };
  
};

module.exports = new RoomsManager();