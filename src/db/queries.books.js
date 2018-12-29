const fs = require("fs");
const Book = require("./models").Book;

module.exports = {
  //loaded from db
  getAllBooks(callback) {
    return Book.all()
      .then((books) => {
        callback(null, books);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getBooks(page, limit, callback) {
    return Book.findAll({ offset: page-1, limit: limit,order:[['id', 'ASC']]}) //for pagination
      .then(books => callback(null, books))
      .catch(err => callback(err))
  },

  countAll(callback) {
    return Book.count()
      .then(total => callback(null, total))
      .catch(err => callback(err))
  },

}