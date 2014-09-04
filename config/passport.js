var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function(passport, config) {
  //this will give us req.user in the route
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id }, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) };
        if (!user) {
          return done(null, false, { message: 'Unknown user' })
        };
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Invalid password' })
        };
        return done(null, user);
      });
    }
  ));
}
