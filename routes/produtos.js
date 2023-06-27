const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()


router.get("/", (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        try {
            conn.query("select id_produto, nome_produto, descricao_produto, valor_produto, quantidade_produto, nome_categoria  from produtos INNER JOIN categorias ON categoria_id = id_categoria", (erro, result)=>{
                conn.release()
                if (erro || !result[0]) {
                    return res.status(500).send({
                      message: "nada encontrado",
                    });
                  }
                  res.status(200).send(result)
            })
        } catch (error) {
            
        }
    })
})

router.get("/:id", (req, res, next)=>{
    let id = req.params.id
    mysql.getConnection((error, conn)=>{
        try {
            conn.query(`SELECT nome_produto, descricao_produto, valor_produto, quantidade_produto 
                        FROM produtos WHERE id_produto = ?`, [id], (erro, result)=>{
                conn.release()
                if (erro || !result[0]) {
                    return res.status(500).send({
                      message: "nada encontrado",
                    });
                  }
                  
                  res.status(200).send({//result
                    nome_produto: result[0].nome_produto,
                    descricao_produto: result[0].descricao_produto,
                    valor_produto: result[0].valor_produto,
                    quantidade_produto: result[0].quantidade_produto,
                    
                })
            })
        } catch (error) {
            
        }
    })
})




module.exports = router;