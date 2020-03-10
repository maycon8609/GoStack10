module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'delivery_problems',
      [
        {
          delivery_id: 1,
          description: 'Destinatario nao se encotrava em casa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          delivery_id: 2,
          description: 'Destinatario mudou de endereco',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          delivery_id: 3,
          description: 'Endereco nao encontrado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          delivery_id: 4,
          description: 'Encomenda perdida',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('delivery_problems');
  },
};
