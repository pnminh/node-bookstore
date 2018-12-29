//configure environment variable and all other middleware.
const totalHeader = 'x-total-count'
require("dotenv").config();
var cors = require('cors')
const path = require("path");

module.exports = {
  init(app, express){
    //expose custom headers from server
    //reference: https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields
    var corsOptions = {
      exposedHeaders: [totalHeader]
    }
    app.use(cors(corsOptions));
    app.use(express.static(path.join(__dirname, "..", "assets")));
  }
  
};

