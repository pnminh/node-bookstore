'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    authors: DataTypes.TEXT,
    image_url:DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};