const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const sliderRatingSchema = sequelize.define('slider_rating', {
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
    tableName : 'slider_rating',
    timestamps: false,
})

sliderRatingSchema.removeAttribute('id');

module.exports.sliderRatingModel = sliderRatingSchema;