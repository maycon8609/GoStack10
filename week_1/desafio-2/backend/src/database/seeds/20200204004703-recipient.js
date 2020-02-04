module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipient',
      [
        {
          name: 'John Doe',
          street: 'rui barbosa',
          number: 7,
          complement: 'teste de seeders',
          state: 'Piaui',
          city: 'teresina',
          cep: 64004215,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('recipient', null, {});
  },
};
