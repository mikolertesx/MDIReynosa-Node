module.exports.getIndex = (req, res, next) => {
  res.render('shop/index');
}

module.exports.getContact = (req, res, next) => {
  res.render('shop/contact');
}

module.exports.getProducts = (req, res, next) => {
  res.render('shop/products');
}