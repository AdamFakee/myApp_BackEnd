const { rawQueryFrameHelper } = require("../helpers/rawQueryFrame.helper");


// get all category
const getAll = async () => {
    const query = `
        select categoryName
        from category
    `
    return await rawQueryFrameHelper(query);
}

module.exports.categoryService = {
    getAll
}