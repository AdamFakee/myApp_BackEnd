const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const categorySchema = sequelize.define('category', {
  productName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    primaryKey : true
  }
},  { 
  tableName : 'category',
  timestamps: false,
})



module.exports.categoryModel = categorySchema;