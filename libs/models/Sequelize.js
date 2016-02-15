var async = require("async");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('mysql://'+process.env.C9_USER+':@'+process.env.IP+':3306/c9');

var Room = sequelize.define('sequelize-rooms', {
  roomName: { type: Sequelize.STRING }
}, { freezeTableName: true });

var Message = sequelize.define('sequelize-rooms-messages', {
  username: { type: Sequelize.STRING }
  , message: { type: Sequelize.STRING }
  , date: { type: Sequelize.STRING }
}, { freezeTableName: true });

Message.belongsTo(Room);
Room.hasOne(Message, {as: 'messages'});

var init = false;
var oSequelize = function () {
  var self = this;
  
  this.init = function (data, callback, origin) {
    init = true;
    Room.sync()
    .then(Message.sync())
    .then(function () {
      origin(data, callback);
    });
  };
  
  this.getMessages = function (data, callback) {
    if (!init) return self.init(data, callback, self.getMessages);
    
    var options = {
      where: {roomName: data.roomName}
      , include: [{model: Message, as: 'messages'}]
    };
    Room.findAll(options).then(function (rooms) {
      var messages = [];
      for (var i = 0; i < rooms.length; i++) {
        var message = rooms[i].get("messages");
        messages.push(message);
      }
      
      return callback(null, messages);
    });
  };

  this.saveMessage = function (data, callback) {
    // {message, username, roomName, date}
    if (!init) return self.init(data, callback, self.saveMessage);

    var options = {
      where: {roomName: data.roomName}
    };
    
    var createMessage = function (callback) {  
      Message.create(data)
        .then(function (obj) {
          callback(null, {message: obj});
        });
    };
    
    var findOrCreateRoom = function (data, callback) {
      Room.findOrCreate(options)
        .then(function (obj) {
          data.room = obj;
          callback(null, data);
        });    
    };
      
    var associateData = function (data, callback) {
      console.log(data.room[0].get("id"));
      /*
      // setMessages écrase toutes les entrées ! ...
      data.room[0].setMessages(data.message)
      .then(function () {
        callback();
      });*/
      data.message.update({sequelizeRoomId: data.room[0].get("id")})
      .then(function () {
        callback();
      });
    };
    
    var jobs = [createMessage, findOrCreateRoom, associateData];
    async.waterfall(jobs, function (err) {
      if (err) return console.err("ERROR on associate data :", err);
      return callback();
    });
  };
};

module.exports = oSequelize;