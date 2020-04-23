const router = require('express').Router;
const controllers = require('../controller/auth');
const Router = router();

Router.get('/register', controllers.getRegister);
Router.post('/register', controllers.postRegister);
Router.get('/login', controllers.getLogin);
Router.post('/login', controllers.postLogin);

module.exports = Router;