module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'John Doe',
          street: 'rui barbosa',
          number: 7,
          complement: 'do lado da farmacia',
          state: 'Piaui',
          city: 'teresina',
          cep: 64004215,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'maycon',
          street: 'alameda parnaiba',
          number: 8,
          complement: 'do lado do banco',
          state: 'Piaui',
          city: 'teresina',
          cep: 64004286,
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
