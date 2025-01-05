require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { databaseConnect } = require('./src/configs/database.config');
const { indexRoute } = require('./src/routes/index.route');
app.use(bodyParser.json());

// db
databaseConnect();
// End db

indexRoute(app)

app.listen('3000', () => {
    console.log("running 3000");
})