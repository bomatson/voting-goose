var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var voteSchema = new Schema({
  createdAt: { type: Date, default: Date.now }
})

var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, index: true },
  votes: [voteSchema]
}, {autoIndex: false})

userSchema.statics.findByUsername = function(name, callback) {
  this.find({username: new RegExp(name, 'i') }, callback);
}

var User = mongoose.model('User', userSchema);

var user = new User({username: 'Bobby', password: 'booga', votes: [{}, {created_at: Date.now}]})

user.save(function(err) {
  console.log(err);
  User.findByUsername('bobby', function(err, users){
    console.log(users.length);
  });

});
