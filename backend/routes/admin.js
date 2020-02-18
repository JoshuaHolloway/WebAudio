// [400]: Not using this anymore
// -Can delete the entire /util directory
const rootDir = require('../util/path'); //.js
//===========================
const path = require('path');
const express = require('express');
const router = express.Router();
//===========================
// [400]
//const products = [];
//===========================
// [400]: Moved anonymous function into product.js 
const productsController = require('../controllers/products'); //.js
router.get('/add-product', productsController.getAddProduct);
//===========================
// [400]: Moved anonymous function into product.js
router.post('/add-product', productsController.postAddProduct);
//===========================
router.get('/error', (req, res) => {
  res.sendFile();
});
//===========================
// [400]
//exports.routes = router;
//exports.products = products;
//===========================
module.exports = router;
// -When you import this in app.js you don't need
//  to use .router with this notation.