const { messageHelper } = require("../helpers/message.helper");
const { bagService } = require("../services/bag.service");

// [POST] /package/create    - add item to package [FE]
const create = async (req, res) => {
    const data = req.body;
    try {
        await bagService.addItemToBag(data);
        return messageHelper.code200(res);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
} 

module.exports.bagController = {
    create
}