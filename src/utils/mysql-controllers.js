/* eslint-disable max-len */
const { Sequelize } = require('sequelize');

const User = require('../database/mysql-user-model');
const Task = require('../database/mysql-task-model');
const db = require('../database/db-mysql'); // TODO eliminar

// Crea un jugador
const createUser = async () => {
  try {
    const newUser = await User.create({
      username: 'pepe',
    });
    console.log('user::::', newUser);
  } catch (err) { console.log(err); }
};

module.exports = { createUser };

// TODO eliminar test
db.connectSequelize();
createUser();
