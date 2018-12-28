const fs = require("fs");
const bookQueries = require("../db/queries.books");

module.exports = {
  
    index(req, res, next){
      bookQueries.getAllBooks((err, booksData) => {
        if(err){
          console.log(err);
          res.redirect(500, "static/index");
        } else {
         // console.log(booksData);
          res.json(booksData);
        }
      })
    },

    //fake book is loaded from db.json
    fakeBook(req, res, next){
      const books = require('json-loader!../../../db.json');
      res.json(200,books);
    }
  }