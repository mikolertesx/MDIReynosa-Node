// This file will just create a basic way to send paths to each page.
const exp_router = require('express').Router;
const Router = exp_router();

Router.use((req, res, next) => {
  res.locals.paths = [
    ['/', 'fas fa-home', 'Inicio'],
    ['/contact', 'fas fa-address-book', 'Contactos'],
    ['/products', 'fas fa-dollar-sign', 'Productos']
  ];

  console.log(res.locals);
  // Check if it's an admin and then add the admin section.
  next();
})

module.exports = Router;