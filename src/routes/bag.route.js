const express = require('express');
const { bagController } = require('../controllers/bag.controller');
const route = express.Router();

route.post('/create', bagController.create)

module.exports.bagRoute = route;