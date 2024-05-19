const mysql = require("mysql2");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("[!] Error connecting to database: " + err);
  } else {
    console.log(
      "[!] Database connected. Connection id: " + connection.threadId
    );
  }
});

module.exports = pool;
