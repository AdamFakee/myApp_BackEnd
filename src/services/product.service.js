const { productModel } = require("../models/product.model")

// get all product
const getAllProduct = async () => {
    return await productModel.findAll();
}

module.exports.productService = {
    getAllProduct,
}