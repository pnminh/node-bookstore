//configure environment variable and all other middleware.
const totalHeader = 'x-total-count'
require("dotenv").config();
var cors = require('cors')
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");


module.exports = {
  init(app, express){
    //since we use json body, we want to parse out the json data and put them into req.body
    app.use(bodyParser.json());
    //expose custom headers from server
    //reference: https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
    var corsOptions = {
      exposedHeaders: [totalHeader]
    }
    app.use(cors(corsOptions));
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(expressValidator());

    app.use(session({
      secret: process.env.cookieSecret, //sign session ID cookie
      resave: false, //prevent session from saving when it isn't modified
      saveUninitialized: false, //prevent a new, unmodified session, from being saved.
      cookie: { maxAge: 1.21e+9 } //set cookie to expire in 14 days
    }));
    
    app.use(flash());
    passportConfig.init(app);

    app.use((req,res,next) => {
      res.locals.currentUser = req.user;
      next();
    })

  }
  
};

