const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { categoryService } = require("../services/category.service");
const { colorService } = require("../services/color.service");
const { productService } = require("../services/product.service");
const { sizeService } = require("../services/size.service");

// [GET] /filter
const getAll = async (req, res) => {
    try {
        const colors = await colorService.getAll();
        const sizes = await sizeService.getAll();
        const categories = await categoryService.getAll();
        const colorFiltereds = filterHelper.changeToArrayString(colors);
        const sizeFiltereds = filterHelper.changeToArrayString(sizes);
        const categoryFiltereds = filterHelper.changeToArrayString(categories);
        // validate
        if(colors.length == 0 || sizes.length == 0 || categories.length == 0) {
            return messageHelper.code404(res);
        }

        const data = {
            colors : colorFiltereds, sizes : sizeFiltereds, categories : categoryFiltereds
        };
        return messageHelper.code200(res, data);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}

// [GET] /filter/getByFilter
const getByFilter = async (req, res) => {
    const {size, color, category, price} = req.body;
    const productFiltereds = await productService.getProductByFilter(price,color, size, category);
    
    if(productFiltereds.length == 0) {
        return messageHelper.code404(res)
    }
    return messageHelper.code200(res, productFiltereds);
}
module.exports.filterController = {
    getAll, getByFilter
}