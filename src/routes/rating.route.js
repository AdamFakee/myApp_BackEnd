const express = require('express');
const { ratingController } = require('../controllers/rating.controller');
const { uploadMedia } = require('../middlewares/uploadToCloud.middleware');
const { decodeHeaderMiddleware } = require('../middlewares/decodedHeader.middleware');
const route = express.Router();
const multer = require('../configs/multer.config')();

route.get('/detail/:productId', ratingController.detail);
route.post('/create', decodeHeaderMiddleware.decodeHeader, multer.array('imgs', 6),  uploadMedia ,ratingController.create);

module.exports.ratingRoute = route;