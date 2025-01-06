const { messageHelper } = require("../helpers/message.helper");

// [POST] /category/create
module.exports.categoryCreate = async (req, res) => {
    res.json({
        code : 200
    })
    // const {categoryName} = req.body;
    // if(!categoryName) {
    //     return messageHelper.code404(res);
    // }
    // try {
    //     const categorylist = await categoryService.getCategory();
    //     console.log(categorylist)
    //     await categoryService.createCategory({categoryName});
    //     return messageHelper.code200(res);
    // } catch (error) {
    //     return messageHelper.code400(res, {}, error.message);
    // }
}