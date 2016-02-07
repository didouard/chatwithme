
var Room = function (data) {
  var messages = [];
  var users = [];
  var roomName = data.roomName;
  
  this.getName = function () {
    return roomName;
  };
  
  this.getUsers = function () {
    return users;
  };
  
  this.addMessage = function (data) {
    messages.push(data.message);
    
    this.broadcastNewMessage(data);
  };
  
  this.addUser = function (user) {
    users.push(user);
    
    this.broadcastAllNewUser(user);
  };
  
  this.removeUser = function (user) {
    users.splice(users.indexOf(user), 1);
    
    this.broadcastAllUser();
  };
  
  this.serializeUsers = function () {
    var serializeUsers = [];
    for (var i = 0; i < users.length; i++) {
      serializeUsers.push(users[i].getName());
    }
    return serializeUsers;
  };
  
  this.serializeMessages = function () {
    var serializeMessages = [];
    for (var i = 0; i < messages.length; i++) {
      serializeMessages.push(messages[i].serialize());
    }
    return serializeMessages;
  };
  
  this.serializeAll = function () {
    return {
      roomName: roomName
      , messages: this.serializeMessages()
      , users: this.serializeUsers()
    };
  };
  
  this.broadcastAllUser = function () {
    var job = { action: "users", users: this.serializeUsers() };
    for (var i = 0; i < users.length; i++)
      users[i].notify(job);
  };
  
  this.broadcastAllNewUser = function (user) {
    var job = {
      action: "roomNewUser"
      , roomName: roomName
      , username: user.getName()
    };
    for (var i = 0; i < users.length; i++)
      if (users[i].getName() != job.user)
        users[i].notify(job);
  };
  
  this.broadcastNewMessage = function (data) {
    var job = {
      action: "roomNewMessage"
      , roomName: roomName
      , message: data.message.getMessage()
      , username: data.user.getName()
      , date: new Date().toISOString()
    };
    for (var i = 0; i < users.length; i++)
      //if (users[i].getName() != job.user)
        users[i].notify(job);
  };
};

module.exports = Room;











