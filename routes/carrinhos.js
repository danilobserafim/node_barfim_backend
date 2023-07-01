const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()
 




router.post("/", (req, res, next)=>{
    const {venda_id, carrinho} = req.body
    arrayCarrinho = JSON.parse(carrinho)
    mysql.getConnection((error, conn) => {
      try {
        arrayCarrinho.map(produto=>{
          conn.query(`INSERT INTO carrinhos (venda_id, produto_id) VALUES (?, ?)`, 
          [venda_id, produto.id],
          (erro, result, field) => {
            if (erro) {
              return res.status(500).send({
                message: "nada encontrado",
              });
            }
            res.status(200).send(result);
          });
        })
        conn.release();
        } catch (error) {
        conn.release();
          res.status(500).send({
            message: "algo deu errado",
          });

        }
      });
  })
  




module.exports = router;