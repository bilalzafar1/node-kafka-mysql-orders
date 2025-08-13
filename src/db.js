const mysql = require('mysql2/promise');

async function createDbConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL user
    password: '', // Replace with your MySQL password
    database: 'order_db'
  });
}

module.exports = { createDbConnection };