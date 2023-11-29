const express = require("express");
const router = express.Router();
const mysql = require("../mysql");
require("dotenv").config()

router.get("/:ID", (req, res, next)=>{
    const id = req.params.ID
    mysql.getConnection((error, conn) => {
        try {
          conn.query(`SELECT nome_cliente, telefone_cliente, email_cliente, 
                        id_produto, nome_produto, descricao_produto, valor_produto,
                        id_venda, valor_venda, desconto, total , data 
                        FROM vendas 
                        INNER JOIN clientes on cliente_id = id_cliente 
                        INNER JOIN carrinhos ON id_venda = venda_id 
                        INNER JOIN produtos ON produto_id = id_produto WHERE id_venda = ? `, [id], (erro, result, field) => {
            conn.release();
            if (erro || !result[0]) {
              return res.status(500).send({
                message: "nada encontrado",
              });
            }
            let data = new Date(result[0].data)
            let dia = data.getDay() < 10 ? "0"+data.getDay():data.getDay()
            let mes = data.getMonth() < 10 ? "0" + data.getMonth() : data.getMonth()
            let ano = data.getFullYear()
            res.status(200).send({
              venda_id: result[0].id_venda,
              Cliente: result[0].nome_cliente,
              telefone: result[0].telefone_cliente,
              email: result[0].email_cliente,
              data: `${dia}/${mes}/${ano}`,
              venda: parseFloat(result[0].valor_venda).toFixed(2),
              desconto: parseFloat(result[0].desconto).toFixed(2),
              total: parseFloat(result[0].total).toFixed(2),
              carrinho: 
                result.map(produto =>{
                  return{
                    id:produto.id_produto,
                    nome: produto.nome_produto,
                    descricao: produto.descricao_produto,
                    valor: produto.valor_produto
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


router.get("/", (req, res, next)=>{
  mysql.getConnection((error, conn) => {
      try {
        conn.query(`SELECT * FROM vendas 
                    INNER JOIN clientes ON cliente_id = id_cliente order by vid_venda desc`, (erro, result, field) => {
          conn.release();
          if (erro || !result[0]) {
            return res.status(500).send({
              message: "nada encontrado",
            });
          }
          res.status(200).send(result.map(venda => {
            let data = new Date(venda.data)
            let dia = data.getDay() < 10 ? "0"+data.getDay() :data.getDay()  
            let mes = data.getMonth() < 10 ? "0" + (data.getMonth() + 1) :data.getMonth()  
            let ano = data.getFullYear()
            return ({
              id: venda.id_venda,
              cliente: venda.nome_cliente,
              data: `${dia}/${mes}/${ano}`,
              valor: parseFloat(venda.valor_venda).toFixed(2),
              desconto:parseFloat( venda.desconto).toFixed(2),
              total: venda.total,
              detalhes: `${process.env.BASE_URL}/vendas/${venda.id_venda}`
          })
          }));
        });
      } catch (error) {
        res.status(500).send({
          message: "algo deu errado",
        });
      }
    });
})

router.post("/", (req, res, next)=>{
  const {cliente_id, valor_venda, desconto, total } = req.body
  mysql.getConnection((error, conn) => {
      try {
        conn.query(`INSERT INTO vendas (cliente_id, valor_venda, desconto, total,  data) VALUES (?,?,?,?, now()) `, 
        [cliente_id, valor_venda, desconto, total], 
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
