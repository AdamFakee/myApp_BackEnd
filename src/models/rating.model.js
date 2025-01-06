const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const ratingSchema = sequelize.define('rating', {
  ratingId : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },
  productId : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
        model : 'product',
        key : 'productId'
    }
  },
  accountName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    references : {
      model : 'customer',
      key : 'accountName'
    }
  },
  detail : {
    type : DataTypes.TEXT
  },
  star : {
    type : DataTypes.INTEGER,
    default : 5
  }
},  { 
  tableName : 'rating',
  timestamps: false,
})



module.exports.ratingModel = ratingSchema;