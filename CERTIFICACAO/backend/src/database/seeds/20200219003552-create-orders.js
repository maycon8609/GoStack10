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
          signature_id: 1,
        },
        {
          product: 'salada',
          deliveryman_id: 2,
          recipient_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
          signature_id: 3,
        },
        {
          product: 'vitamina',
          deliveryman_id: 1,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
          signature_id: 2,
        },
        {
          product: 'caldo',
          deliveryman_id: 3,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
          signature_id: 3,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('orders');
  },
};
