const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db.config');

const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    tableName: 'users',
    timestamps: true,
  });

module.exports = users;
