const express = require('express');
const router  = express.Router();
const mysql = require('../mysql.js').pool;

// Retorna todos os produtos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE data_inativo IS NULL;',
            (error, resultado, campo) => {
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});


// Insere um produto
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, gtin, segmento, grupo, altura, largura, profundidade, peso_bru, peso_liq, data_criacao) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, now())',
            [req.body.nome, req.body.gtin, req.body.segmento, req.body.grupo, req.body.altura, req.body.largura, req.body.profundidade, req.body.peso_bru, req.body.peso_liq],
            (error, resultado, campo) => {
                conn.release();

                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                } else {
                    res.status(201).send({
                        mensagem: 'Produto inserido com sucesso!',
                        id_produto: resultado
                    })
                }
            }  
        )
    })
});

// Busca produto específico
router.get('/:id_produto', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, campo) => {
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

//Altera produto
router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
           `UPDATE produtos 
            SET nome         = ?,
            gtin             = ?,
            segmento         = ?,
            grupo            = ?,
            altura           = ?,
            largura          = ?,
            profundidade     = ?,
            peso_bru         = ?,
            peso_liq         = ?,
            data_modif       = now()
            WHERE id_produto = ?`,
            [req.body.nome, req.body.gtin, req.body.segmento, req.body.grupo, req.body.altura, req.body.largura, req.body.profundidade, req.body.peso_bru, req.body.peso_liq, req.body.id_produto],
            (error, resultado, campo) => {
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

// Remove produto (soft delete)
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'UPDATE produtos SET data_inativo = now() where id_produto = ?;', [req.body.id_produto],
            (error, resultado, campo) => {
                if(error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});


module.exports = router;