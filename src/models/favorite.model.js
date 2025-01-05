const mongoose = require('mongoose');
const Favorite = new mongoose.Schema({
  productId : {
    type : String,
    require : true,
  },
  userId : {
    type : String,
    require : true,
  },
  status : {
    type : Boolean,
    default : true
  }
}, {
  timestamps : true,
});

module.exports.favoriteModel = mongoose.model('Favorites', Favorite, 'Favorites');