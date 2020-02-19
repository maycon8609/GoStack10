module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'files',
      [
        {
          name: 'lufy.png',
          path: '8e7f4981c0ffeccf68a4c60d07ebb0de.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'zoro.jpg',
          path: 'bc133d8b76c25211da04b72f2f3254e2.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'vegeta.jpg',
          path: '8660ef8cd981a1206ca48735d9f65992.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.dropTable('files');
  },
};
