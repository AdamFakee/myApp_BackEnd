const { messageHelper } = require("../helpers/message.helper");
const { favoriteService } = require("../services/favorite.service");

// [POST] /favorite/create    - add item to favorite [FE]
const create = async (req, res) => {
    const {accountName} = res.customer;
    const {productId, sizeName} = req.body;
    // validate
    if(!productId || !sizeName) {
        return messageHelper.code400(res);
    }
    try {
        await favoriteService.addItemToBag({accountName, productId, sizeName});
        return messageHelper.code200(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
} 

// [GET] /favorite/detail   - see all items in favorite [FE]
const detail = async (req, res) => {
    const {accountName} = res.customer;
    try {
        const items = await favoriteService.getAll(accountName);
        return items.length > 0 ? messageHelper.code200(res, items) : messageHelper.code204(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}

// [DELETE] /favorite/deleteItem  - delete one item in favorite [FE]
const deleteItem = async (req, res) => {
    const {accountName} = res.customer;
    const {productId, sizeName} = req.body;
    // validate
    if(!productId || !sizeName) {
        return messageHelper.code400(res);
    }
    try {
        await favoriteService.deleteItem({accountName, productId, sizeName});
        return messageHelper.code200(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}
module.exports.favoriteController = {
    create, detail, deleteItem
}