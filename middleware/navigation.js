// This file will just create a basic way to send paths to each page.
const exp_router = require('express').Router;
const User = require('../model/User');
const Router = exp_router();

Router.use('/', (req, res, next) => {
  res.locals.paths = [
    ['/', 'fas fa-home', 'Inicio'],
    ['/contact', 'fas fa-address-book', 'Contactos'],
    ['/products', 'fas fa-dollar-sign', 'Productos']
  ];
  if (req.session.user) {
    User.findById(req.session.user).then(user => {
      req.user = user;
      if (req.user) {
        res.locals.paths.push([
          '/admin', 'fas fa-cog', 'Opciones'
        ], [
            '/logout', 'fas fa-sign-out-alt', 'Salir'
        ])
      }
      return next();
    })
  } else {
    next();
  }
})

module.exports = Router;