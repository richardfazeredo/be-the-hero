
exports.up = function(knex) { // Método responsável pela criação da tabela
  return knex.schema.createTable('ongs', function(table){ //Esquema de criação de tabela
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) { // Método responsável por voltar atrás da criação de uma tabela
  knex.schema.dropTable('ongs');
};
