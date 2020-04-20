const connection = require('../database/connection'); //Importando a conexão com BD

module.exports = { //Exportando um objeto
  async index(request, response) {
    const { page = 1 } = request.query; //Paginação

    const [count] = await connection('incidents').count(); //Contagem de casos 

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //Junção de dados das tabelas da Ong e dos casos
      .limit(5) //Limite de exibição de casos por página
      .offset((page - 1) * 5) //Incremento de 5 casos a cada página
      .select([
        'incidents.*', //Todos os campos da tabela incidents e em baixo todos da tabela ONG menos o ID
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']); //Resposta da contagem de casos no header

    return response.json(incidents); //Retorno e exibição dos casos
  },

  
  async create(request, response) { //criando um incident
    const { title, description, value } = request.body; //cadastrando e fazendo a desestruturação
    const ong_id = request.headers.authorization; //Acessar o id da Ong atravéz desse valor

    const [id] = await connection('incidents').insert({ //Inserindo dados na tabela incidents
        title,
        description,
        value,
        ong_id,
    });

    return response.json({ id }); //Retornando o id
  },

  async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization; //Verificar se o incidente realmente foi criado pela Ong que está tentando deleta-lo

    const incident = await connection('incidents') //Buscar caso da tabela incidentes
    .where('id', id) //Aonde o id for igual esse id 
    .select('ong_id') //selecionar da tabela apenas a coluna ong_id
    .first(); //Como só há um id a ser procurado, usar o first para retornar apenas um resultado 

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({error: 'Operation not permited.'});
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send(); 
  }
};

