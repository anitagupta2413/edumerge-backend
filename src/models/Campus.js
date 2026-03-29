const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Campus = sequelize.define('Campus', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  }
  // institutionId will be added by associations
}, {
  timestamps: true,
  tableName: 'campuses'
});

module.exports = Campus;
