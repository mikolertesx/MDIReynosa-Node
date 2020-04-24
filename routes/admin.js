// TODO Add a getProducts page.
// TODO Add a products request response (Not redirection but JS Client).
// TODO Add a main user account.

const router = require('express').Router;
const Router = router();
const controllers = require('../controller/admin');
const auth = require('../middleware/auth');

Router.get('/', auth.isAuth, controllers.getIndex);

module.exports = Router;