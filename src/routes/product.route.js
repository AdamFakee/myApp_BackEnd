const express = require('express');
const { product } = require('../controllers/product.controller');
const route = express.Router();

route.get('/', product);

module.exports.productRoute = route;