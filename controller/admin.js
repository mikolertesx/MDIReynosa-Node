const Product = require('../model/Product');
const fileDelete = require('../util/fileHelper').deleteFile;

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

module.exports.updateProducts = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = 0;
  const image = req.body.image;
  const description = req.body.description;
  console.log('image', image);
  Product.findOne({
    _id: id
  }).then(product => {
    product.price = price;
    if (image !== null) {
      console.log('Product changed?', image, product.image);
      fileDelete(product.image);
      product.image = image;
    }
    product.description = description;
    product.name = name;

    return product.save();
  }).then(() => res.json({ message: 'Ok' }))
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