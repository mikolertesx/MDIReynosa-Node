module.exports.getRegister = (req, res, next) => {
  res.render('auth/register');
}

module.exports.getLogin = (req, res, next) => {
  res.render('auth/login');
}