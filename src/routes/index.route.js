const { decodeHeaderMiddleware } = require("../middlewares/decodedHeader.middleware");
const { bagRoute } = require("./bag.route");
const { customerRoute } = require("./customer.route");
const { favoriteRoute } = require("./favorite.route");
const { filteRoute } = require("./filter.route");
const { orderRoute } = require("./order.route");
const { productRoute } = require("./product.route");
const { ratingRoute } = require("./rating.route");

module.exports.indexRoute = (app) => {
    app.use('/product', productRoute);
    app.use('/customer', customerRoute);
    app.use('/order', orderRoute);
    app.use('/bag', decodeHeaderMiddleware.decodeHeader, bagRoute);
    app.use('/favorite', decodeHeaderMiddleware.decodeHeader, favoriteRoute);
    app.use('/rating', ratingRoute);
    app.use('/filter', filteRoute);
}