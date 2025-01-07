const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const customerSchema = sequelize.define('customer', {
  fullName : {
    type : DataTypes.STRING(255),
    allowNull : false,
  },
  accountName : {
    type : DataTypes.STRING(255),
    allowNull : false,
    primaryKey : true,
  },
  accountPass : {
    type : DataTypes.STRING(255),
    allowNull : false
  },
  avatar : {
    type : DataTypes.STRING(255),
    default : null
  },
  salt : {
    type : DataTypes.STRING(500),
    allowNull : false
  }
},  { 
  tableName : 'customer',
  timestamps: false,
})

customerSchema.removeAttribute('id');

module.exports.customerModel = customerSchema;