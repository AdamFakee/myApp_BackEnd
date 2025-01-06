const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const packageCustomerSchema = sequelize.define('package_customer', {
    packageId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'package',
            key : 'packageId'
        }
    },
    acountName : {
        type : DataTypes.STRING(255),
        allowNull : false,
        references : {
            model : 'customer',
            key : 'accountName'
        }
    },
},  { 
    tableName : 'package_customer',
    timestamps: false,
})

packageCustomerSchema.removeAttribute('id');

module.exports.packageCustomerModel = packageCustomerSchema;