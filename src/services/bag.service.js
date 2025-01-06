const { bagModel } = require("../models/bag.model");

// add one item to package
const addItemToBag = async (data) => {
    console.log(data)
    return await bagModel.create(data);
}

module.exports.bagService = {
    addItemToBag,
}