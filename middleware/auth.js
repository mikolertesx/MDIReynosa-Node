module.exports.isAuth = (req, res, next) => {
  if (req.user && req.user.role !== 'Pendiente') {
    console.log('Acceso garantizado.');
    next();
  } else {
    console.log('Acceso no garantizado.');
    return res.redirect('/');
  }
}

module.exports.isNotAuth = (req, res, next) => {
  if (req.user && req.user.role === 'Pendiente') {
    return res.redirect('/');
  } else if (req.user) {
    return res.redirect('/')
  }
  next();
}