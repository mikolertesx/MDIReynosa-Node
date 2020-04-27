const router = require('express').Router;
const controllers = require('../controller/auth');
const auth = require('../middleware/auth');
const Router = router();


// #region Registrar.
Router.get('/register', auth.isNotAuth, controllers.getRegister);

Router.post('/register', controllers.postRegister);
// #endregion

// #region Login
Router.get('/login', auth.isNotAuth, controllers.getLogin);

Router.post('/login', controllers.postLogin);

Router.get('/logout', controllers.getLogout);
// #endregion

module.exports = Router;