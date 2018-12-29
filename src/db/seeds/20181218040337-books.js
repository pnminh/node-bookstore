'use strict';
//import json and convert it into js file

const json = require('json-loader!../../../db.json');

let books = [];

for(let i = 0 ; i < json.length ; i++){
  books.push({
    title: json[i].title,
    description: json[i].description,
    price: json[i].price,
    image_url: json[i].image_url,
    authors: json[i].authors.join(', '),
    createdAt: new Date(),
    updatedAt: new Date()
  });
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Books", books, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete("Books", null, {});
  }
};
