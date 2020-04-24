const csrf = require('csurf');
const csrfProtection = csrf();
const Router = require('express').Router;
const router = Router();
router.use(csrfProtection);

module.exports = router;