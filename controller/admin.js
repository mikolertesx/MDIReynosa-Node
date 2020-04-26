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

module.exports.createProduct = (req, res, next) => {
  return Product
    .create({})
    .then(product => {
      return res.json({id: product._id.toString()})
    })
}

module.exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product
    .findOneAndDelete({_id: id})
    .then(deleted => {
      return res.json({
        'message': 'Ok'
      })
    })
}

module.exports.updateProducts = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
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

module.exports.deletePicture = (req, res, next) => {
  const image = req.body.path;
  fileDelete(image);
  console.log(image);
}