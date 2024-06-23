const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "manager",
  port: 3306,
  database: "tiffin_delivery_self",
  connectionLimit: 10,
});

module.exports = { pool };
