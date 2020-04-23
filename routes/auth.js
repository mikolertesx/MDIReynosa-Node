const router = require('express').Router;
const controllers = require('../controller/auth');
const Router = router();

Router.get('/register', controllers.getRegister);
Router.get('/login', controllers.getLogin);

module.exports = Router;