const Product = require('../model/Product');
const User = require('../model/User');
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

module.exports.getEmployees = (req, res, next) => {
  let registeredUsers;
  let notRegisteredUsers;

  User.find({ role: 'Pendiente' })
    .then(nUsers => {
      notRegisteredUsers = nUsers;
    })
    .then(() => User.where('role').ne('Pendiente'))
    .then(rUsers => {
      registeredUsers = rUsers;
    }).then(() => {
      return res.render('admin/employees', {
        usuariosRegistrados: registeredUsers,
        usuariosNoRegistrados: notRegisteredUsers,
        usuarioActual: req.user,
        csrfToken: req.csrfToken()
      });
    })
}

// JSON req.
module.exports.acceptEmployee = (req, res, next) => {
  const id = req.body.id;
  console.log('Userid', id);
  console.log('body', req.body);
  User
    .findOne({ _id: id })
    .then(user => {
      if (user) {
        return user;
      }
      else {
        throw new Error('No usuario');
      }
    })
    .then(confirmedUser => {
      confirmedUser.role = 'Empleado';
      return confirmedUser.save();
    })
    .then(result => {
      res.json({message: result ? "Worked":"Error"});
    })
}

module.exports.rejectEmployee = (req, res, next) => {
  const id = req.body.id;
  User
    .findOneAndDelete({ _id: id})
    .then(result => {
      return res.json({
        message: result ? "Ok":"Error"
      })
    })
}

module.exports.createProduct = (req, res, next) => {
  return Product
    .create({})
    .then(product => {
      return res.json({ id: product._id.toString() })
    })
}

module.exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product
    .findOneAndDelete({ _id: id })
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
  const url = req.body.url;
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
    product.url = url;
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