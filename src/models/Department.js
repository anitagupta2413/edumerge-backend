const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('Department', {
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
    allowNull: false
  },
  hod: {
    type: DataTypes.STRING,
    allowNull: true
  }
  // campusId will be added by associations
}, {
  timestamps: true,
  tableName: 'departments'
});

module.exports = Department;
