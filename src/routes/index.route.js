const { categoryRoute } = require("./category.route");
const { customerRoute } = require("./customer.route");
const { orderRoute } = require("./order.route");
const { productRoute } = require("./product.route");

module.exports.indexRoute = (app) => {
    app.use('/product', productRoute);
    app.use('/customer', customerRoute);
    app.use('/order', orderRoute);
    app.use('/category', categoryRoute)
}