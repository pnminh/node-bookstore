require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());
    app.use(session({
      secret: process.env.cookieSecret, //sign session ID cookie
      resave: false, //prevent session from saving when it isn't modified
      saveUninitialized: false, //prevent a new, unmodified session, from being saved.
      cookie: { maxAge: 60000 } //sets expiration time on the cookie in milliseconds.
    }));
    app.use(flash());
    
  }
};

