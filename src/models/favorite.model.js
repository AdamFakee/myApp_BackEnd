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
  },
  sizeName : {
    type: DataTypes.ENUM,
    values: ['s', 'm', 'l', 'xl', 'xxl'],
    allowNull : false,
    references : {
      model : 'size',
      key : 'sizeName'
    }
  }
},  { 
  tableName : 'favorite',
  timestamps: false,
})

favoriteSchema.removeAttribute('id');

module.exports.favoriteModel = favoriteSchema;