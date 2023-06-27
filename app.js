const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const routeClientes = require("./routes/clientes")
const routeVendas = require("./routes/vendas")
const routeProdutos = require("./routes/produtos")
const routeCarrinhos = require("./routes/carrinhos")
const routeCategorias = require("./routes/categorias")



const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use("/clientes", routeClientes )
app.use("/vendas", routeVendas)
app.use("/produtos", routeProdutos)
app.use("/carrinhos", routeCarrinhos)
app.use("/categorias", routeCategorias)

app.get("/",(req, res, next)=>{
    res.send({
        mensagem: "Funcionando"
    })
})

module.exports = app;
