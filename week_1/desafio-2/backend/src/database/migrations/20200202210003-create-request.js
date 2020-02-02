module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('request', { id: Sequelize.INTEGER });
  },

  down: queryInterface => {
    return queryInterface.dropTable('request');
  },
};
