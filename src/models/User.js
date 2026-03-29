const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'STAFF', 'VIEWER'),
    allowNull: false,
    defaultValue: 'VIEWER'
  }
}, {
  timestamps: true,
  tableName: 'users',
  indexes: [
    { unique: true, fields: ['email'] }
  ]
});

module.exports = User;
