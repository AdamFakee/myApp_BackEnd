const mongoose = require('mongoose');
const Product = new mongoose.Schema({
  productName : String,
  discount : {
    default : 0,
    type : Number
  },
  shopName : String,
  categoryName : {
    type : String,
    require : true
  },
  color : {
    type : [String]
  },
  price : Number,
  imageMain : String,
  imageSlide : {
    type : [String],
    default : []
  },
  detail : String,
  desc : String,
  status : {
    type : Boolean,
    default : true
  }
}, {
  timestamps : true,
});

module.exports.productModel = mongoose.model('Products', Product, 'Products');