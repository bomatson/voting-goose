var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('localhost', 'test');

var voteSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
})

var userSchema = new Schema({
  username: String,
  email: String,
  votes: [voteSchema]
})

userSchema.statics.findByUsername = function(name, callback) {
  this.find({username: new RegExp(name, 'i') }, callback);
}

var User = mongoose.model('User', userSchema);

var user = new User({username: 'Bobby',votes: [{}, {created_at: Date.now}]})

user.save(function(err) {
  console.log(this);
});

User.findByUsername('bobby', function(err, users){
  console.log(users.length);
});
