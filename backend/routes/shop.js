//===========================
const path = require('path');
const express = require('express');

// [400]: Don't need these anymore
// const rootDir = require('../util/path'); //.js
// const admin_data = require('./admin'); //.js

const router = express.Router();
//===========================
// [400]: Moved anonymous function into Controllers/products.js
const productsController = require('../controllers/products'); // .js
router.get('/', productsController.getProducts);
//===========================
module.exports = router;
//===========================
