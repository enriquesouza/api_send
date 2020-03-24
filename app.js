require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sendController = require('./controllers/SendController');
const app = express();
app.use(bodyParser.json());
app.use("/", sendController);
module.exports = app;