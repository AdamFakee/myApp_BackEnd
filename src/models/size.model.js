const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const sizeSchema = sequelize.define('size', {
    sizeName : {
        type: DataTypes.ENUM,
        values: ['s', 'm', 'l', 'xl', 'xxl'],
        allowNull : false,
        primaryKey : true,
    }
},  { 
    tableName : 'size',
    timestamps: false,
})



module.exports.sizeModel = sizeSchema;