// eslint-disable-next-line max-classes-per-file
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db-mysql');
const User = require('./mysql-user-model');

class Task extends Model {}
Task.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    createdAt: { type: DataTypes.DATE, defaultValue: new Date() },
    startedAt: { type: DataTypes.DATE },
    finishedAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
  },
  { sequelize, modelName: 'task' }
);

User.hasMany(Task, {
  foreignKey: {
    allowNull: true,
  },
});

Task.belongsTo(User); // A BelongsTo B

module.exports = Task;
