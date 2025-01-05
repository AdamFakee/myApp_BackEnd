const mongoose = require('mongoose');
const Order = new mongoose.Schema({
  idUser : {
    type : String,
    require : true,
  },
  product : {
    type : [{
        idItem : Number,
        amount : Number,
        price : Number
    }],
    require : true
  },
  status : {
    default : "pendding",
    type : String,
    enum: ['pendding', 'confirmed', 'delivery', 'refusedFromShop', 'refusedFromCliet', 'done']
  }
}, {
  timestamps : true,
});

module.exports.orderModel = mongoose.model('Orders', Order, 'Orders');