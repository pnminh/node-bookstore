const fs = require("fs");
const Book = require("./models").Book;

module.exports = {
    getAllBooks(callback){
        var booksData = [];
        var bookData = {};
        return Book.all()
         .then((books) => {
           for (let i=0; i <books.length; i++){
             let bookData = {...books[i].title} //retrieving all books from database
             bookData.fileName = bookData.title.split(".").slice(0, -1).join(".");
             booksData.push(bookData);
           }
          console.log(booksData);
            callback(null, booksData);
        })
        .catch((err) => {
          callback(err);
        })
    }
}