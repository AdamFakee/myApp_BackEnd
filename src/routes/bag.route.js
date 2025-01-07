const express = require('express');
const { bagController } = require('../controllers/bag.controller');
const route = express.Router();

route.post('/create', bagController.create)
route.get('/detail', bagController.detail)
route.delete('/deleteItem', bagController.deleteItem)
module.exports.bagRoute = route;