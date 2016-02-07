

var Message = function (data) {
  var message = data.message;
  var user = data.user;
  var room = data.room;
  
  this.getMessage = function () {
    return message;
  };
  
  this.getUser = function () {
    return user;
  };
  
  this.getRoom = function () {
    return room;
  };
  
  this.serialize = function () {
    return {user: user.getName(), message: message};
  };
};

module.exports = Message;