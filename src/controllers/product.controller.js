const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { categoryService } = require("../services/category.service");
const { productService } = require("../services/product.service")
// [GET] /product    -  /home [FE]
const home = async (req, res) => {
    try {
        let discountProducts = await productService.getDiscountProduct();
        let newProducts = await productService.getNewProduct();

        // caculate new price
        discountProducts = filterHelper.calculateNewPrice(discountProducts);
        newProducts = filterHelper.calculateNewPrice(newProducts);

        const data = {
            discountProducts, newProducts
        }
        return messageHelper.code200(res, data);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message)
    }    
}

// [GET] /product/detail/:productId     - /home/itemDetail [FE]
const detail = async (req, res) => {
    try {
        const {productId} = req.params;
        if(productId){
            const item = await productService.getOneProduct(productId);
            // check item empty
            if(item.length==0) {
                return messageHelper.code404(res);
            }
            const itemMergedImage = filterHelper.mergeImageDetailItem(item);
            let additionalProducts = await productService.getRandonProducts();

            // caculate new price
            additionalProducts = filterHelper.calculateNewPrice(additionalProducts);
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

const  getAll = async (req, res) => {
    try {
        const products = await productService.getAllProduct();
        const categories = await categoryService.getAll();
        const categoryFiltered = filterHelper.changeToArrayString(categories);
        if(products.length == 0 || categories.length == 0) {
            return messageHelper.code404(res);
        }

        const data = {
            products : products, 
            categories : categoryFiltered
        }

        return messageHelper.code200(res, data);
    } catch (error) {
        return messageHelper.code400(res, {}, error.messsage);
    }
}

// [Get] /product/:categoryName 
const getProductByCategoryName = async (req, res) => {
    const {categoryName} = req.params;
    try {
        let products = [];
        // categoryName == all => get all product
        if(categoryName == 'all') {
            products = await productService.getAllProduct();
        } else {
            products = await productService.getProductByCategoryName(categoryName);
        }
        // check product
        if(products.length == 0 ) {
            return messageHelper.code404(res);
        }
        const data = {
            products : products
        }
        return messageHelper.code200(res, data);
    } catch (error) {
        return messageHelper.code400(res)
    }
}
module.exports.productController = {
    home, detail, getAll, getProductByCategoryName
}