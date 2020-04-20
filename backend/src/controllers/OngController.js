const crypto = require('crypto'); //Pacote usado para criar o id das ONGs
const connection = require('../database/connection'); //Importando a conexão com o DB

module.exports = {
        async index(request, response) { //Rota que lista todas as ongs do DB
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response){
    const {name, email, whatsapp, city, uf} /*Desestruturação*/ = request.body; /*acessando
    dados do corpo da requisição*/

    const id = crypto.randomBytes(4).toString('HEX'); /*Utilizando esse pacote para criar 
    um id aleatório, gerado em números e convertidos para string*/

    await connection('ongs').insert({ //inserindo as informações das variáveis no DB
      id,
      name, 
      email, 
      whatsapp, 
      city,
      uf
    })

    return response.json({ id }); //Retornando o ID gerado aleatóriamente
    }
}