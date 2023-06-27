const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()


router.get("/", (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        try {
          conn.query(`SELECT id_cliente, nome_cliente, email_cliente, telefone_cliente FROM clientes`, (erro, result, field) => {
            conn.release();
            if (erro || !result[0]) {
              return res.status(500).send({
                message: "nada encontrado",
              });
            }
            res.status(200).send({
              result:result.map(cliente =>{
                return {id_cliente: cliente.id_cliente,
                  nome: cliente.nome_cliente,
                  email: cliente.email_cliente,
                  telefone: cliente.telefone_cliente,
                  mais: `${process.env.BASE_URL}/clientes/${cliente.id_cliente}/`
              }
              })
            });
          });
        } catch (error) {
          res.status(500).send({
            message: "algo deu errado",
          });
        }
      });
})

router.get("/:id", (req, res, next)=>{
    mysql.getConnection((error, conn) => {
        const id = req.params.id
        try {
          conn.query(`SELECT nome_cliente, email_cliente, telefone_cliente, 
                        id_venda, data, total , valor_venda, desconto 
                        FROM clientes 
                        INNER JOIN vendas ON cliente_id = id_cliente 
                        WHERE id_cliente = ?`, [id], (erro, result, field) => {
            conn.release();
            if (erro || !result[0]) {
              return res.status(500).send({
                message: "nada encontrado",
              });
            }
            res.status(200).send({
              nome:result[0].nome_cliente,
              email:result[0].email_cliente,
              telefone:result[0].telefone_cliente,
              cliente:result[0].nome_cliente,
              compras:result.map( venda =>{
                const data = new Date(venda.data)
                const dia = data.getDay()< 10 ? "0" + data.getDay() : data.getDay()
                const mes = data.getMonth() < 10 ? "0" + data.getMonth() : data.getMonth()
                const ano = data.getFullYear()
                return({
                    venda_id: venda.id_venda,
                    valor: parseFloat(venda.valor_venda).toFixed(2),
                    desconto: parseFloat(venda.desconto).toFixed(2),
                    total: parseFloat(venda.total).toFixed(2),
                    data: `${dia}/${mes}/${ano}`,
                    mais: `${process.env.BASE_URL}/vendas/${venda.id_venda}`
                })
            })
            });
          });
        } catch (error) {
          res.status(500).send({
            message: "algo deu errado",
          });
        }
      });
})
router.post("/", (req, res, next) => {
    const { nome, telefone, email } = req.body;
    mysql.getConnection((error, conn) => {
      try {
        conn.query(
          `INSERT INTO clientes (nome_cliente, telefone_cliente, email_cliente) VALUES(?,?,?)`,
          [nome, telefone, email],
          (erro, result, field) => {
            conn.release();
            if (erro) {
              return res.status(500).send({
                message: "Algo deu errado, tente novamente",
              });
            }
            res.status(200).send({
              message: "Usuario cadastrado",
            });
          }
        );
      } catch (error) {
        res.status(500).send({
          message: "Algo deu errado, tente novamente",
        });
      }
    });
  });

  router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    mysql.getConnection((error, conn) => {
      try {
        conn.query(
          `UPDATE clientes SET acount_status = 0 WHERE id_cliente = ?;`,
          [id],
          (erro, result, field) => {
            conn.release();
            if (erro) {
              return res.status(500).send({
                message: "Algo deu errado, tente novamente",
              });
            }
            res.status(410).send({
              message: "Usuario deletado",
            });
          }
        );
      } catch (error) {
        res.status(500).send({
          message: "Algo deu errado, tente novamente",
        });
      }
    });
  });

  module.exports = router;