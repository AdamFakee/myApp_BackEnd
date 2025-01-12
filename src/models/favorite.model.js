const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const favoriteSchema = sequelize.define('favorite', {
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
  }
},  { 
  tableName : 'favorite',
  timestamps: false,
})

favoriteSchema.removeAttribute('id');

module.exports.favoriteModel = favoriteSchema;