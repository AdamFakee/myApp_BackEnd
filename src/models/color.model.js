const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const colorSchema = sequelize.define('color', {
  colorCode : {
    type : DataTypes.CHAR(7),
    autoIncrement : true,
    allowNull : false,
    primaryKey : true,
  }
},  { 
  tableName : 'color',
  timestamps: false,
})



module.exports.colorModel = colorSchema;