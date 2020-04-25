const Product = require('../model/Product');

module.exports.getIndex = (req, res, next) => {
  return res.render('admin/index');
}

module.exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      return res.render('admin/products.pug', {
        products: products,
        csrfToken: req.csrfToken()
      });
    })
}

module.exports.sendPicture = (req, res, next) => {
  const image = req.file;
  const imageUrl = image.path.replace('public', '');
  console.log(imageUrl);
  return res.json({
    message: 'Worked',
    path: imageUrl
  });
}