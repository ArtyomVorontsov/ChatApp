'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    
    await queryInterface.addColumn(
      "messages",
      "reaction",
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

