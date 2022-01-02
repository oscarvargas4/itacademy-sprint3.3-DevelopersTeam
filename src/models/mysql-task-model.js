// eslint-disable-next-line max-classes-per-file
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db-mysql');
const User = require('./mysql-user-model');

class Task extends Model {}
Task.init({
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  finishAt: { type: DataTypes.DATE},

}, { sequelize, modelName: 'task' });

User.hasMany(Task, {
  foreignKey: {
    allowNull: true,
  },
});

Task.belongsTo(User); // A BelongsTo B

module.exports = Task;
