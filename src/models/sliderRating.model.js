const {sequelize} = require('../configs/database.config')
const {DataTypes } = require('sequelize');

const sliderRatingSchema = sequelize.define('slider_rating', {
    ratingId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : 'rating',
            key : 'ratingId'
        }
    },
    image : {
        type : DataTypes.TEXT, 
        allowNull : false,
    }
}, { 
    tableName : 'slider_rating',
    timestamps: false,
})

sliderRatingSchema.removeAttribute('id');

module.exports.sliderRatingModel = sliderRatingSchema;