const express = require('express');
const { favoriteController } = require('../controllers/favorite.controller');
const route = express.Router();

route.post('/create', favoriteController.create)
route.get('/detail', favoriteController.detail)
route.delete('/deleteItem', favoriteController.deleteItem)
module.exports.favoriteRoute = route;