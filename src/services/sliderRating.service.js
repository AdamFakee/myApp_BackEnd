const { sliderRatingModel } = require("../models/sliderRating.model")

// create row
const create = async (data) => {
    return await sliderRatingModel.create(data);
}

module.exports.silderRatingService = {
    create 
}