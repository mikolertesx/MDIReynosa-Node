const User = require('../model/User');
const bcrypt = require('bcrypt');

module.exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    csrfToken: req.csrfToken()
  });
}

module.exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password.trim();
  let isAdmin = false;

  User
    .count()
    .then(qty => {
      isAdmin = qty === 0 ? true : false;
      return;
    })
    .then(() =>{
      return User.findOne({ name: username }) 
    }) 
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
              products: [],
              role: isAdmin ? "Administrador": "Empleado"
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
  res.render('auth/login', {
    csrfToken: req.csrfToken()
  });
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

module.exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}