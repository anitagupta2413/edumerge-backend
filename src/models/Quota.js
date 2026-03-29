const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Quota = sequelize.define('Quota', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM('KCET', 'COMEDK', 'Management'),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true,
  tableName: 'quotas'
});

module.exports = Quota;
