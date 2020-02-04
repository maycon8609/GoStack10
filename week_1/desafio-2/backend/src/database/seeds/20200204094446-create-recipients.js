module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'John Doe',
          street: 'rui barbosa',
          number: 7,
          complement: 'teste de seeders',
          state: 'Piaui',
          city: 'teresina',
          cep: 64004215,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('recipients', null, {});
  },
};
