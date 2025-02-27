const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const packageProductSchema = sequelize.define('package_customer', {
    packageId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'package',
            key : 'packageId'
        }
    },
    productId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'product',
            key : 'productId'
        }
    },
},  { 
    tableName : 'package_customer',
    timestamps: false,
})

packageProductSchema.removeAttribute('id');

module.exports.packagePrdocutModel = packageProductSchema;