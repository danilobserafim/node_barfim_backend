const mysql = require("mysql");
require('dotenv').config()

var pool = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE,
  host: process.env.HOST,
  port: 3306,
  connectionLimit: 100,
  multipleStatements: true
});
  
  module.exports = pool;
  