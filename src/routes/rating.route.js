const express = require('express');
const { ratingController } = require('../controllers/rating.controller');
const route = express.Router();

route.get('/detail/:productId', ratingController.detail);
route.post('/create', ratingController.create);

module.exports.ratingRoute = route;