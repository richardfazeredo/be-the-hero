const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); //Variável que recebe o desacoplamento do módulo de rotas

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); //criação da ONG

routes.get('/profile', ProfileController.index); //Pesquisar os casos de uma ONG específica

routes.get('/incidents', IncidentController.index); //Consultar os casos
routes.post('/incidents', IncidentController.create); //Criação do caso
routes.delete('/incidents/:id', IncidentController.delete) //Deletar um caso

module.exports = routes; //exportando a variável rotas de dentro desse arquivo

/*
*Rota / Recurso
*/

/*
*Métodos HTTP:

* GET: Buscar/listar uma informação do back-end
* POST: Criar uma informação no back-end
* PUT: Altarar informação no back-end
* DELETE: Deletar uma informação no back-end
*/ 

/*
* Tipos de parâmetros:

*Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
*Route Params: Parâmetros utilizados para identificar recursos
*Request body: Corpo da requisição utilizado para criar e alterar recursos
*/ 

/*
*Bancos de dados no mercado:

*SQL: MySQL, SQLite, PostgreeSQL, Oracle, Microsoft SQL Server
*NoSQL: MongoDB, CouchDB, etc
*/

/*
*Formas de fazer a comunicação com banco de dados:

*Driver: Ex: SELECT * FROM users
*Query Builder: table('users').select('*').where(código javascript) "Aceita qualquer banco SQL"
*/