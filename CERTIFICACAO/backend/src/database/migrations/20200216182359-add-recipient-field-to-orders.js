module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('orders', 'recipient_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'recipients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('orders', 'recipient_id');
  },
};
