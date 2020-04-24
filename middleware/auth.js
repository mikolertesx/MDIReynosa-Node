module.exports.isAuth = (req, res, next) => {
  if (req.user) {
    console.log('Acceso garantizado.');
    next();
  } else {
    console.log('Acceso no garantizado.');
    return res.redirect('/');
  }
}

module.exports.isNotAuth = (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
}