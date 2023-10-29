var mysql = require('mysql2');
const db = mysql.createPool({
  host: 'database-1.crsko3wmlgbz.ap-northeast-2.rds.amazonaws.com',
  user: 'gyeongjin',
  password: 'E93B*da1Eli!',
  database: 'ICT_TEAM',
  port: 3306,
});

module.exports = db;
