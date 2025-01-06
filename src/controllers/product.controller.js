const { messageHelper } = require("../helpers/message.helper");
const { productService } = require("../services/product.service")
// [GET] /product
module.exports.product = async (req, res) => {
    try {
        const products = await productService.getAllProduct();
        return messageHelper.code200(res, products);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message)
    }    
}