const express = require('express');
const { orderCheckout } = require('../controllers/order.controller');
const route = express.Router();

route.post('/checkout', orderCheckout);

module.exports.orderRoute = route;