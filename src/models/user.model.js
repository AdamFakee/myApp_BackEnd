const mongoose = require('mongoose');
const User = new mongoose.Schema({
  userName : {
    type : String,
    require : true
  },
  pass : {
    type : String,
    require : true,
  },
  fullName : {
    type : String,
    default : 'a tuan dep trai'
  },
  status : {
    type : Boolean,
    default : true
  }
}, {
  timestamps : true,
});

module.exports.userModel = mongoose.model('Users', User, 'Users');