const mongoose = require('mongoose');
const Category = new mongoose.Schema({
   categoryName : {
    type : String,
    unique : true,
    require : true
   }
}, {
  timestamps : true,
});

module.exports.categoryModel = mongoose.model('Categories', Category, 'Categories');