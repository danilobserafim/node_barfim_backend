const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()
 




router.post("/", (req, res, next)=>{
    const {venda_id, carrinho} = req.body
    carrinho.map(produto=>{
      mysql.getConnection((error, conn) => {
        try {
            conn.query(`INSERT INTO carrinhos (venda_id, produto_id) VALUES (?, ?)`, 
            [venda_id, produto.id],
            (erro, result, field) => {
              
            });
          } catch (error) {
            res.status(500).send({
              message: "algo deu errado",
            });
  
          }
        });
    })
    res.status(200).send({
      message: "tudo certo campeão"
    })
  })
  




module.exports = router;