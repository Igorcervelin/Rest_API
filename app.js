const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Referência das rotas
const rotaProdutos = require('./routes/produtos.js'); 
const rotaExpedicao = require('./routes/expedicao.js');

app.use(bodyParser.urlencoded({extended: false}));  // Aceitar apenas dados simples
app.use(bodyParser.json()); // Aceitar apenas formato json no body

// Validação de segurança
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // API acessível de todos (*) os servidores
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Metodos aceitos
        return res.status(200).send({})
    }

    next();
});

// Chamada das rotas
app.use('/produtos', rotaProdutos); 
app.use('/expedicao', rotaExpedicao);

module.exports = app;