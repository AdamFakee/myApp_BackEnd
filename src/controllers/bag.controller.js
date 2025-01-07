const { messageHelper } = require("../helpers/message.helper");
const { bagService } = require("../services/bag.service");

// [POST] /bag/create    - add item to bag [FE]
const create = async (req, res) => {
    const {accountName} = res.customer;
    const {productId, sizeName} = req.body;
    // validate
    if(!productId || !sizeName) {
        return messageHelper.code400(res);
    }
    try {
        await bagService.addItemToBag({accountName, productId, sizeName});
        return messageHelper.code200(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
} 

// [GET] /bag/detail   - see all items in bag [FE]
const detail = async (req, res) => {
    const {accountName} = res.customer;
    try {
        const items = await bagService.getAll(accountName);
        return items.length > 0 ? messageHelper.code200(res, items) : messageHelper.code204(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}

// [DELETE] /bag/deleteItem  - delete one item in bag [FE]
const deleteItem = async (req, res) => {
    const {accountName} = res.customer;
    const {productId, sizeName} = req.body;
    // validate
    if(!productId || !sizeName) {
        return messageHelper.code400(res);
    }
    try {
        await bagService.deleteItem({accountName, productId, sizeName});
        return messageHelper.code200(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}
module.exports.bagController = {
    create, detail, deleteItem
}