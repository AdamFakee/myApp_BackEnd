const { decodeHeaderMiddleware } = require("../middlewares/decodedHeader.middleware");
const { bagRoute } = require("./bag.route");
const { categoryRoute } = require("./category.route");
const { customerRoute } = require("./customer.route");
const { orderRoute } = require("./order.route");
const { productRoute } = require("./product.route");

module.exports.indexRoute = (app) => {
    app.use('/product', productRoute);
    app.use('/customer', customerRoute);
    app.use('/order', orderRoute);
    app.use('/category', categoryRoute)
    app.use('/bag', decodeHeaderMiddleware.decodeHeader, bagRoute);
}