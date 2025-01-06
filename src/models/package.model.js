const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const packageSchema = sequelize.define('package', {
    address : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    quantity : {
        type : DataTypes.INTEGER, 
        allowNull : false,
    },
    totalPrice : {
        type : DataTypes.FLOAT, 
        allowNull : false,
    },
    status : {
        type : DataTypes.ENUM, 
        values: ['pendding', 'delivered', 'comfirmed', 'refund'],
        default : 'pendding'
    },
    packageId : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
      },
}, { 
    tableName : 'package',
    timestamps: false,
})

packageSchema.removeAttribute('id');

module.exports.packageModel = packageSchema;