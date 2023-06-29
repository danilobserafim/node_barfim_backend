const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()





router.post("/", (req, res, next)=>{
    const {venda_id, produto_id} = req.body

    mysql.getConnection((error, conn) => {
        try {
          conn.query(`INSERT INTO carrinhos (venda_id, produto_id) VALUES (?, ?)`, 
          [parseInt(venda_id), parseInt(produto_id)],
          (erro, result, field) => {
            conn.release();
            if (erro) {
              return res.status(500).send({
                message: "nada encontrado",
              });
            }
            res.status(200).send(result);
          });
        } catch (error) {
          res.status(500).send({
            message: "algo deu errado",
          });
        }
      });
  })
  




module.exports = router;