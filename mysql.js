const mysql = require("mysql");

var pool = mysql.createPool({
    user: "root",
    password: "",
    database: "barfim_ecommerce",
    host: "localhost",
    port: 3306,
  });
  
  module.exports = pool;
  