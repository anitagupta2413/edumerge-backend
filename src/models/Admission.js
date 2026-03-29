const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admission = sequelize.define('Admission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  admissionNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  feeStatus: {
    type: DataTypes.ENUM('PENDING', 'PAID'),
    defaultValue: 'PENDING'
  },
  documentStatus: {
    type: DataTypes.ENUM('PENDING', 'VALID', 'INVALID'),
    defaultValue: 'PENDING'
  },
  admissionConfirmation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  // applicantId added by associations
}, {
  timestamps: true,
  tableName: 'admissions'
});

module.exports = Admission;
