const Product = require('../model/Product');
const Mail = require('../util/mail');

module.exports.getIndex = (req, res, next) => {
  const info = req.flash('info')[0];
  res.render('shop/index', {
    info: info
  });
}

module.exports.getContact = (req, res, next) => {
  const message = req.flash('info')[0];
  res.render('shop/contact', {
    info: message,
    csrfToken: req.csrfToken()
  });
}

// TODO Add a postContact.
module.exports.postContact = (req, res, next) => {
  const name = req.body.name;
  const mail = req.body.mail;
  const message = req.body.message;

  Mail
    .sendMail(`${name} esta interesado en un producto.`, `Correo de contacto: ${mail}\n${message}`)
    .then(result => {
      if (result) {
        req.flash('info', 'Correo enviado correctamente.');
        res.redirect('/contact');
      }
    })
}


module.exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      return res.render('shop/products',
        {
          products: products
        });
    })
}