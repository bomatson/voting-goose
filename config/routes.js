var users = require('../app/controllers/users');

module.exports = function(app, passport) {
  app.get('/', users.signup);
}
