var express = require('express'),
    flash = require('connect-flash'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    logger = require('morgan'),
    csrf = require('csurf'),
    helpers = require('view-helpers'),
    pkg = require('../package.json'),
    env = process.env.NODE_ENV || 'development';

module.exports = function(app, config, passport) {
  app.set('showStackError', true);

  app.use(compression({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  }));

  app.use(express.static(config.root + '/public'));

  //try using winston on prod
  if (env !== 'test') { app.use(logger('dev')) };

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    next();
  });

  app.use(cookieParser());
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(session({
    secret: pkg.name,
    store: new mongoStore({
      url: config.db,
      collection : 'sessions'
    })
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  app.use(helpers(pkg.name))

  if (env !== 'test') {
    app.use(csrf())

    app.use(function(req, res, next){
      res.locals.csrf_token = req.csrfToken()
      next()
    })
  }

  app.use(app.router)

  app.use(function(req, res, next){
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    })
  });

}

