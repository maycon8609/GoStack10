module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'orders',
      [
        {
          product: 'pudim',
          deliveryman_id: 1,
          recipient_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'salada',
          deliveryman_id: 2,
          recipient_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'vitamina',
          deliveryman_id: 1,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'caldo',
          deliveryman_id: 3,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
