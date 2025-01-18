const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { ratingModel } = require("../models/rating.model");

// create row 
const create = async (data) => {
    return await ratingModel.create(data);
}

// get rating for a specific product
const detailNoImage = async (productId) => {
    const query = `
        SELECT 
            rating.ratingId, customer.fullName, rating.detail, rating.star,  customer.avatar, GROUP_CONCAT(slider_rating.image SEPARATOR ', ') AS imgArray, ROUND(AVG(rating.star) OVER (PARTITION BY rating.productId), 1) AS averageStar
        FROM rating
        JOIN customer ON customer.accountName = rating.accountName
        left join slider_rating on slider_rating.ratingId = rating.ratingId
        WHERE rating.productId = ${productId}
        GROUP BY rating.ratingId, customer.fullName, rating.detail, rating.star, customer.avatar
    `;
    return await rawQueryFrameHelper(query);
}


module.exports.ratingService = {
    detailNoImage, create
}