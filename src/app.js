const express = require('express');
const app = express();

const appConfig = require("./config/main-config.js");
const routeConfig = require('./config/route-config');

routeConfig.init(app);
appConfig.init(app, express);

module.exports = app;