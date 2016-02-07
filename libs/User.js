var async = require("async");

var Message = require("./Message.js");


var User = function (data) {
  var self = this;
  var name = "anonymous";
  var rooms = [];
  var socket = data.socket;
  var roomsManager = data.roomsManager;
  
  socket.on("error", function (err) {
    console.error(err);
  })
  
  socket.on("in", function (jobs) {
    if (!(jobs instanceof Array)) return console.error("ERROR: user.on(in, data). data need to be an array");
    
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i];
      if (!(job.action in self)) return console.error("ERROR: action: " + job.action + " not found");
      console.log("call function :", job.action);
      self[job.action](job);
    }
  });

  this.getName = function () {
    return name;
  };
  
  this.getAllRoom = function () {
    console.log("getAllRoom");
    var params = {
      action: "roomList"
      , rooms: roomsManager.serializeAllRoom()
    };
    self.notify(params);
  };
  
  this.notify = function (data) {
    socket.emit("out", data);
  };

  
  this.joinRoom = function (data) {
    var room = roomsManager.get(data.roomName);
    room.addUser(self);

    // on envoie tous les informations necessaire pour contruire la room
    var job = room.serializeAll();
    job.action = "joinRoom";
    self.notify(job);
  };

  this.quitRoom = function (data) {
    
  };

  this.newMessage = function (data) {
    data.room = roomsManager.get(data.roomName);
    data.user = self;
    // data.message = data.message
    
    var message = new Message(data);
    data.message = message;
    data.room.addMessage(data);
  };
  
  this.setName = function (data) {
    name = data.name;
    
    for (var i = 0; i < rooms.length; i++) {
      rooms[i].broadcastUsers();
    }
  };
  
};

module.exports = User;