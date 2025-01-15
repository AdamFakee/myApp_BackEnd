const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { ratingService } = require("../services/rating.service");
const multer = require('../configs/multer.config')();
const uploadRating = multer.single('imgs');
// [GET] /rating/detail/:productId  -- [FE] rating
const detail = async (req, res) => {
    const {productId} = req.params;
    try {
        const ratings = await ratingService.detailNoImage(productId);
        const fillterdRatings = filterHelper.seperateObjectImage(ratings);

        const rating_not_contain_img = fillterdRatings.dataFilltered_not_contain_img;
        const rating_contain_img = fillterdRatings.dataFilltered_contain_img;
        const ratingChart = fillterdRatings.dataChart;
        const dataReturned = {
            rating_contain_img, rating_not_contain_img, ratingChart
        }
        return messageHelper.code200(res, dataReturned);
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}

// [POSt] /rating/create  - [FE] write rating
const create = async (req, res) => {
    uploadRating(req, res, function(err) {
        if(err) {
            console.log(err)
            return messageHelper.code500(res, {}, err.message);
        }
        console.log('body : ', req.body)
        console.log('file : ', req.file);
        return messageHelper.code200(res);
    });
}

module.exports.ratingController = {
    detail, create
}