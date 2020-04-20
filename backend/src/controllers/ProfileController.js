const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization; //Acessar os dados da ong logada

    const incidents = await connection('incidents') //Buscar os incidentes atravéz de connection
    .where('ong_id', ong_id)
    .select('*');

  return response.json(incidents);
  }

}