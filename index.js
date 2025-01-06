require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { indexRoute } = require('./src/routes/index.route');
const { sequelize } = require('./src/configs/database.config');
app.use(bodyParser.json());

// db
sequelize;
// End db

indexRoute(app)

app.listen('3000', () => {
    console.log("running 3000");
})