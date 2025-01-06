const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const bagSchema = sequelize.define('bag', {
    accountName : {
        type : DataTypes.STRING(255),
        allowNull : false,
        references : {
            model : 'customer',
            key : 'accountName'
        }
    },
    productId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'product',
            key : 'productId'
        }
    }
},  { 
    tableName : 'bag',
    timestamps: false,
})

bagSchema.removeAttribute('id');

module.exports.bagModel = bagSchema;