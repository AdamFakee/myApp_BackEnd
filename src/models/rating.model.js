const mongoose = require('mongoose');
const Rating = new mongoose.Schema({
  productId : {
    type : String,
    require : true,
  },
  userId : {
    type : String,
    require : true,
  },
  userName : {
    type : String,
    require : true,
  },
  avatarUser : {
    type : String,
    require : true,
  },
  desc : String,
  star : {
    type : Number,
    default : 5
  },
  imageSlider : {
    type : [String],
    default : []
  }
}, {
  timestamps : true,
});

module.exports.ratingModel = mongoose.model('Ratings', Product, 'Ratings');