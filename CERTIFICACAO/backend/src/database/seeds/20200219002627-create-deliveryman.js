module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliverymans',
      [
        {
          name: 'maycon',
          email: 'maycon@gmail.com',
          avatar_id: 1,
          number_orders: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'carlos',
          email: 'carlos@gmail.com',
          avatar_id: 1,
          number_orders: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'rogerio',
          email: 'rogerio@gmail.com',
          avatar_id: 1,
          number_orders: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliverymans');
  },
};
