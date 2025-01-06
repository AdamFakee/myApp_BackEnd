const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const sliderProductSchema = sequelize.define('slider_product', {
    productId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'product',
            key : 'productId'
        }
    },
    image : {
        type : DataTypes.STRING(255), 
        allowNull : false,
    }
}, { 
    tableName : 'slider_product',
    timestamps: false,
})



module.exports.sliderProductModel = sliderProductSchema;