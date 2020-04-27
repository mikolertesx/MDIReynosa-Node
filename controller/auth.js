const User = require('../model/User');
const bcrypt = require('bcrypt');

module.exports.getRegister = (req, res, next) => {
  const message = req.flash('error')[0];
  console.log(message);
  res.render('auth/register', {
    csrfToken: req.csrfToken(),
    message: message
  });
}

module.exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let isAdmin = false;

  User
    .countDocuments()
    .then(qty => {
      isAdmin = qty === 0 ? true : false;
      return;
    })
    .then(() => {
      if (password === confirmPassword) return;
      throw new Error('Las contraseñas no coinciden.');
    })
    .then(() => {
      if (password.length > 5) return;
      throw new Error('Las contraseñas deben medir al menos 5 caracteres.');
    })
    .then(() => {
      return User.findOne({ name: username })
    })
    .then(doc => {
      if (doc) {
        throw new Error('El usuario ya existe.');
      } else {
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            return User.create({
              name: username,
              password: hashedPassword,
              products: [],
              role: isAdmin ? "Administrador" : "Pendiente"
            });
          });
      }
    })
    .then(() => {
      req.flash('info', 'La cuenta se encuentra en revisión')
      return res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      req.flash('error', error.message);
      return res.redirect('/register');
    });
}
module.exports.getLogin = (req, res, next) => {
  const message = req.flash('error')[0];
  console.log(message);
  res.render('auth/login', {
    csrfToken: req.csrfToken(),
    message: message
  });
}

module.exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password.trim();
  let userFound;
  User.findOne({ name: username })
    .then(user => {
      if (user && user.role !== 'Pendiente') {
        return user;
      } else if (!user) {
        throw new Error('Usuario no encontrado.');
      } else if (user.role === 'Pendiente') {
        throw new Error('El usuario todavía no ha sido aprobado.');
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
      req.flash('error', error.message);
      res.redirect('/login')
    })

}

module.exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}