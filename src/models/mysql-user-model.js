// eslint-disable-next-line max-classes-per-file
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db-mysql');

class User extends Model {}
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, { sequelize, modelName: 'user' });

// TODO crear invited-id

module.exports = User;
