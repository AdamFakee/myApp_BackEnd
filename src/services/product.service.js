const { Op } = require("sequelize");
const { productModel } = require("../models/product.model");
const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");

// get all product
const getAllProduct = async () => {
    return await productModel.findAll();
}
// get discount product
const getDiscountProduct = async () => {
    const discount = 10;
    const limit = 10;
    const query = `
        select 
            product.productId, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage 
        from 
            product
        left join 
            rating on rating.productId = product.productId
        where discount >= ${discount}
        GROUP BY product.productId
        limit ${limit};
    `
    return await rawQueryFrameHelper(query);
}

// get new product 
const getNewProduct = async () => {
    const discount = 10;
    const limit = 10;
    const query = `
        select 
            product.productId, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage 
        from 
            product
        left join 
            rating on rating.productId = product.productId
        where discount < ${discount}
        GROUP BY product.productId
        limit ${limit};
    `
    return await rawQueryFrameHelper(query);
}

// get one product
const getOneProduct = async (productId) => {
    const query = `
        SELECT 
            product.productId, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, slider_product.image, COUNT(rating.ratingId) AS starCount,IFNULL(AVG(rating.star), 0) AS starAverage
        FROM 
            product
        LEFT JOIN 
            rating ON rating.productId = product.productId
        LEFT JOIN 
            slider_product ON slider_product.productId = product.productId
        WHERE product.productId = ${productId}
        GROUP BY slider_product.image

    `
    return await rawQueryFrameHelper(query);
}

// get random list product
const getRandonProducts = async () => {
    const limit = 10;
    const query = `
        SELECT 
            p1.productId, p1.productName, p1.discount, p1.shopName, p1.price, p1.imageMain, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage  
        FROM 
            product as p1
        JOIN 
            (SELECT productId FROM product ORDER BY RAND() LIMIT ${limit}) as p2 ON p1.productId=p2.productId
        LEFT JOIN 
            rating ON rating.productId = p1.productId
        group by p1.productId
    `
    return await rawQueryFrameHelper(query);
}
module.exports.productService = {
    getAllProduct, getDiscountProduct, getNewProduct, getOneProduct, getRandonProducts
}