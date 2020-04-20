
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){ //Esquema de criação de tabela
      table.increments(); //Criação de chave primária de id númerico com auto-incremento

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable(); //Campo que vai armazenar um valor float

      table.string('ong_id').notNullable();

      table.foreign('ong_id').references('id').inTable('ongs'); //Chave estrangeira da ONG
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

//npx knex migrate:rollback Desfaz a última migration que foi feita
//npx knex migrate:status Lista todas as migrations que já foram executadas