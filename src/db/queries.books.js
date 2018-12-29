const fs = require("fs");
const Book = require("./models").Book;
const Sequelize = require("../../src/db/models/index").Sequelize;
module.exports = {
  //loaded from db
  getBooks(filters, callback) {
    //filters: from react/client, 
    //queryFilter: transform client filters to filters that can be unserstood by sequelize
    let queryFilter = {};
    //if title_like:select * from books where title like '%title_like%';
    if (filters.title_like) {
      queryFilter.where = { title: { [Sequelize.Op.iLike]: `%${filters.title_like}%` } }
    }
    //if no title_like:select * from books';
    //if page and limit: select * from books offset (filters.page-1) limit (filters.limit);
    if (filters.page && filters.limit) {
      queryFilter.offset = filters.page - 1;
      queryFilter.limit = filters.limit;
      queryFilter.order = [['id', 'ASC']];
    }
    //if no page or limit:select * from books;
    Book.findAll(queryFilter).then((books) => {
      callback(null, books);
    })
      .catch((err) => {
        callback(err);
      })
  },

  countBooks(title_like, callback) { //count total item that sent from server (x-total-count)
    //queryFilter: for sequelize
    let queryFilter = {};
    //like sql: select * from books where title like %title_like%
    if (title_like) {
      queryFilter.where = { title: { [Sequelize.Op.iLike]: `%${title_like}%` } }
    }
    //if no title_like: select * from books
    return Book.count(queryFilter)
      .then(total => callback(null, total))
      .catch(err => callback(err))
  }
}