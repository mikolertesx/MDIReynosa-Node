const express = require('express');
const router = express.Router();
const shopController = require('../controller/shop');

router.get('/', shopController.getIndex);
router.get('/contact', shopController.getContact);
router.get('/products', shopController.getProducts);
// TODO Add put, place and delete requests.

module.exports = router;