const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");


// get all color
const getAll = async () => {
    const query = `
        SELECT colorCode
        FROM color;
    `
    return await rawQueryFrameHelper(query);
}

module.exports.colorService = {
    getAll
}