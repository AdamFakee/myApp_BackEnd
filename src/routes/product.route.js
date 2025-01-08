const express = require('express');
const { productController } = require('../controllers/product.controller');
const route = express.Router();

route.get('/', productController.home);
route.get('/detail/:productId', productController.detail)

module.exports.productRoute = route;