const User = require('../model/User');
const bcrypt = require('bcrypt');

// TODO Add CSRF protection.
module.exports.getRegister = (req, res, next) => {
  res.render('auth/register');
}

module.exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password.trim();
  const user = User.findOne({ name: username })
    .then(doc => {
      if (doc) {
        throw new Error('This shouldnt happen');
      } else {
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            console.log(password, hashedPassword);
            return User.create({
              name: username,
              password: hashedPassword,
              products: []
            });
          });
      }
    })
    .then(() => {
      return res.redirect('/');
    })
    .catch(error => {
      return res.redirect('/register');
    });
}
module.exports.getLogin = (req, res, next) => {
  res.render('auth/login');
}

module.exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password.trim();
  let userFound;
  User.findOne({ name: username })
    .then(user => {
      if (user) {
        return user;
      }
      else {
        throw new Error('Usuario no encontrado.');
      }
    })
    .then(user => {
      userFound = user._id;
      return bcrypt.compare(password, user.password)
    })
    .then(result => {
      if (result) {
        req.session.user = userFound;
        return res.redirect('/');
      }
      else {
        throw new Error('Contraseña equivocada.');
      }
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/login')
    })

}