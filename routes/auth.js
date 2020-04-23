const router = require('express').Router;
const controllers = require('../controller/auth');
const Router = router();

// #region Registrar.
Router.get('/register', controllers.getRegister);
// TODO Add validation to the post register.
Router.post('/register', controllers.postRegister);
// #endregion

// #region Login
Router.get('/login', controllers.getLogin);

// TODO Add validation toe the post login.
Router.post('/login', controllers.postLogin);
// #endregion

module.exports = Router;