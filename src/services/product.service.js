const { Op, where } = require("sequelize");
const { productModel } = require("../models/product.model");
const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");
const { sequelize } = require("../configs/database.config");

// get all product
const getAllProduct = async () => {
    return await productModel.findAll({
        order : sequelize.random(),
        limit: 10 
    });
}
// get discount product
const getDiscountProduct = async () => {
    const discount = 10;
    const limit = 10;
    const query = `
        select 
            product.productId, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage, product.categoryName 
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
            product.productId, product.productName, product.discount, product.shopName, product.price, product.imageMain, product.amount, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage, product.categoryName 
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
            product.*, slider_product.image, COUNT(rating.ratingId) AS starCount,IFNULL(AVG(rating.star), 0) AS starAverage
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
            p1.productId, p1.productName, p1.discount, p1.shopName, p1.price, p1.imageMain, count(ratingId) as starCount, IFNULL(AVG(rating.star), 0) AS starAverage, p1.categoryName   
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

// get product by category name
const getProductByCategoryName = async (categoryName) => {
    return await productModel.findAll({
        where : {
            categoryName : categoryName
        },
        limit : 10
    });
}

// get product by filter
const getProductByFilter = async (price={}, color=[], size=[], category=[], brand=[]) => {
    const {minPrice, maxPrice} = price;
    const priceCondition = 
        price
            ? `product.price between ${minPrice} and ${maxPrice}`
            : `1=1`;
    const colorCondition = color.length > 0 
        ? `product_color.colorCode IN (${color.map(c => `'${c}'`).join(', ')})` 
        : `1 = 1`; // Không có color thì điều kiện luôn đúng

    const sizeCondition = size.length > 0 
        ? `product_size.sizeName IN (${size.map(s => `'${s}'`).join(', ')})` 
        : `1 = 1`; // Không có size thì điều kiện luôn đúng

    const categoryCondition = category.length > 0 
        ? `product.categoryName IN (${category.map(cat => `'${cat}'`).join(', ')})` 
        : `1 = 1`; // Không có category thì điều kiện luôn đúng
    const query = `
        select 
            product.productId, product.productName, product.discount, product.categoryName, product.price, product.imageMain, product.detail, product.shopName, product.amount
        from 
            product 
        join 
            product_size on product.productId = product_size.productId
        join 
            product_color on product.productId = product_color.productId
        where 
            ${sizeCondition} and ${colorCondition} and ${priceCondition} and ${categoryCondition}
        group by product.productId;
    `
    return await rawQueryFrameHelper(query);
}
module.exports.productService = {
    getAllProduct, getDiscountProduct, getNewProduct, getOneProduct, getRandonProducts, getProductByCategoryName, getProductByFilter
}