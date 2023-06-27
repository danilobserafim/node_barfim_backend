const express = require("express");
const router = express.Router();
const mysql = require("../mysql");



router.get("/", (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        try {
            conn.query("SELECT nome_categoria FROM categorias", (erro, result)=>{
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
    const id = req.params.id
    mysql.getConnection((error, conn)=>{
        try {
            conn.query(`SELECT nome_produto, descricao_produto, valor_produto, nome_categoria FROM categorias
                        INNER JOIN produtos ON categoria_id = id_categoria 
                        WHERE id_categoria = ? `, [id], (erro, result)=>{
                conn.release()
                if (erro || !result[0]) {
                    return res.status(500).send({
                      message: "nada encontrado",
                    });
                  }
                  res.status(200).send({
                    categoria:result[0].nome_categoria,
                    produtos: result
                  }) 
            })
        } catch (error) {
            
        }
    })
})






module.exports = router;