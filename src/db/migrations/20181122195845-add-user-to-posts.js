'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /* Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
      return queryInterface.addColumn(
        "Posts",
        "userId",
        {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          allowNull: true,
          references: {
            model: "Users",
            key: "id",
            as: "userId"
          },
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.removeColumn("Posts", "userId");
  }
};
