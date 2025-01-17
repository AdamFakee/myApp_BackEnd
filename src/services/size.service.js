const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");


// get all size
const getAll = async () => {
    const query =  `
        select sizeName 
        from size
    `
    return await rawQueryFrameHelper(query);
}

module.exports.sizeService = {
    getAll
}