const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { favoriteModel } = require("../models/favorite.model");

// add one item to package
const addItemToBag = async (data) => {
    return await favoriteModel.create(data);
}

// get all item
const getAll = async (accountName) => {
    const query = `
        select distinct 
            product.productId, round((product.price * product.discount), 2) as newPrice, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, count(ratingId) as starCount, IFNULL(AVG(rating.star), 1) AS starAverage, product.categoryName 
        from 
            favorite
            join product on product.productId = favorite.productId
        left join 
            rating on rating.productId = product.productId

        where favorite.accountName = '${accountName}'
        GROUP BY product.productId
    `;
    return await rawQueryFrameHelper(query);
}

// delete one item
const deleteItem = async (data) => {
    const {productId, accountName} = data;
    return await favoriteModel.destroy({
        where : {
            accountName : accountName,
            productId : productId,
        }
    })
}
module.exports.favoriteService = {
    addItemToBag, getAll, deleteItem
}