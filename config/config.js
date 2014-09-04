var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/voting_dev',
    root: rootPath,
   app: {
      name: 'Voting Gooses'
    }
  },
  test: {
    db: 'mongodb://localhost/voting_test',
    root: rootPath,
    app: {
      name: 'Voting Gooses'
    }
  },
  production: {}
}
