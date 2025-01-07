const express = require('express');
const {customerController} = require('../controllers/customer.controller');
const route = express.Router();

route.post('/register', customerController.register);
route.post('/login', customerController.login);

module.exports.customerRoute = route;