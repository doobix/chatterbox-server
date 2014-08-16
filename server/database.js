var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var server = 'mongodb://seewes:1234!@ds063439.mongolab.com:63439/chatterbox';
mongoose.connect(server);

var Message = new Schema({
  username: String,
  text: String,
  roomname: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('messages', Message);
