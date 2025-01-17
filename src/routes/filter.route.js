const express = require('express');
const { filterController } = require('../controllers/filter.controller');
const route = express.Router();

route.get('/', filterController.getAll);
route.post('/getByFilter', filterController.getByFilter);

module.exports.filteRoute = route;