const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos.js'); // Referência da rota de produtos

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

app.use('/produtos', rotaProdutos); // Chama a rota

module.exports = app;