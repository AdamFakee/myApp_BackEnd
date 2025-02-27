const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const productSizeSchema = sequelize.define('product_size', {
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
    tableName : 'product_size',
    timestamps: false,
})

productSizeSchema.removeAttribute('id');

module.exports.productSizeModel = productSizeSchema;