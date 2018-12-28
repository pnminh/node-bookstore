const fs = require("fs");
const Book = require("./models").Book;

module.exports = {
  //loaded from db
    getAllBooks(callback){
        return Book.all()
         .then((books) => {
            callback(null, books);
        })
        .catch((err) => {
          callback(err);
        })
    }

    
}