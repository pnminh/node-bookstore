const bookQueries = require("../db/queries.books");
const totalHeader = 'x-total-count'
module.exports = {

  index(req, res, next) {
    let page = req.query._page?+req.query._page:null; //+ to become a number
    let limit = req.query._limit?+req.query._limit:null;

    bookQueries.countAll((err, total) => {
      if (err) {
        console.log(err);
        res.json(500, { "error": "Internal Server Error" });
      } else {
        res.set(totalHeader, total);  //res.setHeader
        if (page == null || limit == null) {
          bookQueries.getAllBooks((err, books) => {
            if (err) {
              console.log(err);
              res.json(500, { "error": "Internal Server Error" });
            } else {
              res.json(books);
            }
          })
        } else {
          switch (page) {
            case 0: res.json([]); break;
            default: bookQueries.getBooks(page, limit, (err, books) => {
              if (err) {
                console.log(err);
                res.json(500, { "error": "Internal Server Error" });
              } else {
                res.json(books)
              }
            }); break;
          }
        }
      }
    });
  },

 
   
}