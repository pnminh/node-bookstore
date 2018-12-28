/* define and export an object that contains multiple functions. 
Each function will contain a handler for a particular route.  */

module.exports = {
    index(req, res, next){
        const books = require('json-loader!../../../db.json');
        res.json(200,books);
  }

}