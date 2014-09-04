var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.signup = function(req, res) {
  res.render('users/new', {
    title: 'Sign up',
    user: new User()
  });
}
