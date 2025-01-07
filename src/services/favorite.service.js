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
            product.productId, product.productName, product.discount, product.categoryname, product.price, product.imageMain, product.shopName, favorite.sizeName, product.amount
        from 
            product
        join favorite on favorite.productId = product.productId
        where favorite.accountName = '${accountName}'
    `;
    return await rawQueryFrameHelper(query);
}

// delete one item
const deleteItem = async (data) => {
    const {productId, accountName, sizeName} = data;
    return await favoriteModel.destroy({
        where : {
            accountName : accountName,
            productId : productId,
            sizeName : sizeName
        }
    })
}
module.exports.favoriteService = {
    addItemToBag, getAll, deleteItem
}