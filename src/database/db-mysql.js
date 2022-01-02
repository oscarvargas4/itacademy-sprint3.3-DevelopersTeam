const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('../../config');
const term = require("terminal-kit").terminal;

const {
  port, host, username, password,
} = config.mysqlConfig;

const database = 'dev_teams_todo_app';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'mysql',
  port,
  define: {
    timestamps: false,
    raw : true
  },
  logging: false
  

});

const connectSequelize = async () => {
  try {
    // Create database if it does not exist/

    const connection = await mysql.createConnection({
      host, port, user: username, password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    // ************** */
    await sequelize.sync({ force: false });
    console.log('Connection to mySQL-DB has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit();
  }
};

module.exports = { checkDB: connectSequelize, sequelize };
