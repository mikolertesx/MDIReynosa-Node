const Product = require('../model/Product');

module.exports.getIndex = (req, res, next) => {
  res.render('shop/index');
}

module.exports.getContact = (req, res, next) => {
  res.render('shop/contact');
}
// TODO Add a postContact.
// TODO Add a nodemailer implementation.

module.exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      console.log(products);
      return res.render('shop/products',
        {
          products: products
        });
    })
}