const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const productColorSchema = sequelize.define('product_color', {
    productId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'product',
            key : 'productId'
        }
    },
    sizeName : {
        type: DataTypes.ENUM,
        values: ['s', 'm', 'l', 'xl', 'xxl'],
        allowNull : false,
        references : {
            model : 'size',
            key : 'sizeName'
        }
    }
},  { 
    tableName : 'product_color',
    timestamps: false,
})



module.exports.productColorModel = productColorSchema;