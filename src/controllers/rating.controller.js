const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { uploadMedia } = require("../middlewares/uploadToCloud.middleware");
const { ratingService } = require("../services/rating.service");
const { silderRatingService } = require("../services/sliderRating.service");
const multer = require('../configs/multer.config')();
const uploadRating = multer.array('imgs', 6);
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
    // uploadRating(req, res, function(err) {
    //     if(err) {
    //         console.log(err)
    //         return messageHelper.code500(res, {}, err.message);
    //     }
    //     uploadMedia(req)
    //     return messageHelper.code200(res);
    // });
    const imgUrls = req.imgUrls;
    const {productId, content, star} = req.body;
    const {accountName} = res.customer;

    if(!productId) {
        return messageHelper.code404(res);
    }

    const ratingData = {
        productId, accountName, detail : content, star
    };

    try {
        const newRating = await ratingService.create(ratingData);
        
        if(imgUrls.length > 0) {
            const sliderRatingData = {
                image : JSON.stringify(imgUrls),
                ratingId : newRating.ratingId,
            }
            await silderRatingService.create(sliderRatingData);
        }
        return messageHelper.code200(res, {imgArray : imgUrls});
    } catch (error) {
        return messageHelper.code400(res, {}, error.message);
    }
}

module.exports.ratingController = {
    detail, create
}