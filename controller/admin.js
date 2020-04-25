const Product = require('../model/Product');

module.exports.getIndex = (req, res, next) => {
  return res.render('admin/index');
}

module.exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      return res.render('admin/products.pug', {
        products: products
      });
    })
}