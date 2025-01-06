const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const categorySchema = sequelize.define('category', {
  categoryName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    primaryKey : true
  }
},  { 
  tableName : 'category',
  timestamps: false,
})

categorySchema.removeAttribute('id');

module.exports.categoryModel = categorySchema;