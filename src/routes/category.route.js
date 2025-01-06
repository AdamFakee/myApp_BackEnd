const express = require('express');
const { categoryCreate } = require('../controllers/category.controller');
const route = express.Router();

route.post('/create', categoryCreate);

module.exports.categoryRoute = route;