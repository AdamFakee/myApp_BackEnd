const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { productService } = require("../services/product.service")
// [GET] /product    -  /home [FE]
const home = async (req, res) => {
    try {
        const discountProducts = await productService.getDiscountProduct();
        const newProducts = await productService.getNewProduct();
        const data = {
            discountProducts, newProducts
        }
        return messageHelper.code200(res, data);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message)
    }    
}

// [GET] /product/detail     - /home/itemDetail [FE]
const detail = async (req, res) => {
    try {
        const {productId} = req.body;
        if(productId){
            const item = await productService.getOneProduct(productId);
            // check item empty
            if(item.length==0) {
                return messageHelper.code404(res);
            }
            const itemMergedImage = filterHelper.mergeImageDetailItem(item);
            const additionalProducts = await productService.getRandonProducts();
            const data = {
                item : itemMergedImage, additionalProducts
            }
            return messageHelper.code200(res, data);
        } else {
            return messageHelper.code404(res);
        }
    } catch (error) {
        return messageHelper.code500(res, {}, error.message);
    }
}

module.exports.productController = {
    home, detail
}