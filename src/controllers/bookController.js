const fs = require("fs");
const bookQueries = require("../db/queries.books");

module.exports = {
    index(req, res, next){
      bookQueries.getAllBooks((err, booksData) => {
        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else {
          console.log(booksData);
          res.render("books/show", {booksData});
        }
      })
    }
  }