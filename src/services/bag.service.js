const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { bagModel } = require("../models/bag.model");

// add one item to package
const addItemToBag = async (data) => {
    return await bagModel.create(data);
}

// get all item
const getAll = async (accountName) => {
    const query = `
        select distinct 
            product.productId, product.productName, product.discount, product.categoryname, product.price, product.imageMain, product.shopName, bag.sizeName
        from 
            product
        join bag on bag.productId = product.productId
        where bag.accountName = '${accountName}'
    `;
    return await rawQueryFrameHelper(query);
}

// delete one item
const deleteItem = async (data) => {
    const {productId, accountName, sizeName} = data;
    return await bagModel.destroy({
        where : {
            accountName : accountName,
            productId : productId,
            sizeName : sizeName
        }
    })
}
module.exports.bagService = {
    addItemToBag, getAll, deleteItem
}