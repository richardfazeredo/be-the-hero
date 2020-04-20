const express = require('express');
const cors = require('cors');
const routes = require('./routes'); //importando a variável ds rotas

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); //Método para usar a variável com as rotas importadas

app.listen(3333);