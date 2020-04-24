const expressRouter = require('express').Router;
const Router = expressRouter();

Router.use((req, res, next) => {
  const user = req.user ? req.user.name : 'Anonimo';
  console.log(`[${req.ip}]: ${req.method} || ${req.hostname}${req.originalUrl}. (${user})`);
  next();
})

module.exports = Router;