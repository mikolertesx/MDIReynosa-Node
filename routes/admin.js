// TODO Add a products request response (Not redirection but JS Client).
// TODO Add a main user account.

const router = require('express').Router;
const Router = router();
const controllers = require('../controller/admin');
const auth = require('../middleware/auth');


function replaceAll(str, find, replace) {
  while(str.search(find)) {
    str = str.replace(find, replace);
  }
  return str;
}

Router.get('/', auth.isAuth, controllers.getIndex);
Router.get('/products', auth.isAuth, controllers.getProducts);

// PICTURES.
Router.post('/sendpicture', auth.isAuth, controllers.sendPicture);
Router.delete('/deletepicture', auth.isAuth);


module.exports = Router;