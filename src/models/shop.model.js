const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const shopSchema = sequelize.define('shop', {
    shopName : {
        type : DataTypes.STRING(255),
        allowNull : false,
        primaryKey : true,
    }
},  { 
    tableName : 'shop',
    timestamps: false,
})



module.exports.shopModel = shopSchema;