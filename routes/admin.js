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

// Update products.
Router.patch('/updateproduct/:id', controllers.updateProducts);
Router.delete('/deleteproduct', controllers.deleteProduct);

// PICTURES.
Router.post('/sendpicture', auth.isAuth, controllers.sendPicture);
Router.post('/createproduct', auth.isAuth, controllers.createProduct);
Router.delete('/deletepicture', auth.isAuth, controllers.deletePicture);

module.exports = Router;