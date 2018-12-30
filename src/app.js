const express = require('express');
const app = express();
const path = require('path');
const appConfig = require("./config/main-config.js");
const routeConfig = require('./config/route-config');

appConfig.init(app, express);
routeConfig.init(app);
//host react on node server
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
module.exports = app;