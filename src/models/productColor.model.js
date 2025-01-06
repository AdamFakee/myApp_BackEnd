const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const productColorSchema = sequelize.define('product_color', {
  productId : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
        model : 'product',
        key : 'productId'
    }
  },
  colorCode : {
    type : DataTypes.CHAR(7), 
    allowNull : false,
    references : {
        model : 'color',
        key : 'colorCode'
    }
  }
},  { 
  tableName : 'product_color',
  timestamps: false,
})

productColorSchema.removeAttribute('id');

module.exports.productColorModel = productColorSchema;