var goose = require('mongoose');
goose.connect('mongodb://localhost/test');

var db = goose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function open() {
  console.log('connection open');
  var userSchema = goose.Schema({
    name: String
  })

  var User = goose.model('User', userSchema);
  var robert = new User({name: 'Robert';)
});
