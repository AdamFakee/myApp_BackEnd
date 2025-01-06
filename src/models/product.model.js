const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const productSchema = sequelize.define('product', {
  productId : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  },
  productName : {
    type : DataTypes.STRING(255),
    allowNull : false,
  },
  discount : {
    type : DataTypes.INTEGER,
    default : 0
  },
  categoryName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    references : {
      model : 'category',
      key : 'categoryName'
    }
  },
  price : {
    type : DataTypes.FLOAT,
    allowNull : false,
  },
  imageMain : {
    type : DataTypes.TEXT,
    allowNull : false
  },
  detail : DataTypes.TEXT,
  shopName : {
    type : DataTypes.STRING(255),
    allowNull : false,
  }
},  { 
  tableName : 'product',
  timestamps: false,
})



module.exports.productModel = productSchema;