const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'milk_trace',
  port: 3306,
  connectionLimit: 10
});

module.exports = pool;