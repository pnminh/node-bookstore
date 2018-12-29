const bookQueries = require("../db/queries.books");
const totalHeader = 'x-total-count'
module.exports = {

  index(req, res, next) {
    let page = req.query._page?+req.query._page:null; //+ to become a number
    let limit = req.query._limit?+req.query._limit:null;
    let title_like = req.query.title_like?req.query.title_like:null;
    //filters: filters sent from client
    let filters = {page,limit,title_like};
    bookQueries.countBooks(filters.title_like,(err, total) => {
      if (err) {
        console.log(err);
        res.json(500, { "error": "Internal Server Error" });
      } else {
        //set header: set total to key totalHeader which is x-total-count
        res.set(totalHeader, total);  //res.setHeader
        if(filters.page === 0){
          res.json([]);
        }
        else{
          bookQueries.getBooks(filters,(err, books) => {
            if (err) {
              console.log(err);
              res.json(500, { "error": "Internal Server Error" });
            } else {
              res.json(books)
            }})
        }
      }
    });
  },

 
   
}