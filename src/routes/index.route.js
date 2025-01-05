const { orderRoute } = require("./order.route");
const { productRoute } = require("./product.route");
const { userRoute } = require("./user.route");

module.exports.indexRoute = (app) => {
    app.use('/product', productRoute);
    app.use('/user', userRoute);
    app.use('/order', orderRoute);
}