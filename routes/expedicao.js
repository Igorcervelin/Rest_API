const express = require('express');
const router  = express.Router();
const mysql = require('../mysql.js').pool;

// Insere um produto no pedido

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO pedido (id_produto, quantidade) VALUES(?, ?),',
            [req.body.id_produto, req.body.quantidade],
            'SELECT * from pedido',
            (error, resultado, campo) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                } else {
                    res.status(201).send({
                        mensagem: 'Produto selecionado para expedicao',
                        id_produto: resultado
                    })
                }
            }  
        )
    })
});

module.exports = router;