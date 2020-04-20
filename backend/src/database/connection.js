const knex = require('knex');
const configuration = require('../../knexfile'); //Importando as configurações do DB

const connection = knex(configuration.development); // Criando a conexão com o banco de dados

module.exports = connection;