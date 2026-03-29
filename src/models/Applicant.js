const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Applicant = sequelize.define('Applicant', {
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
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  entryType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  marks: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  docStatus: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('NEW', 'ALLOCATED', 'CONFIRMED'),
    defaultValue: 'NEW'
  },
  allotmentNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seatAllocated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
  // programId, quotaId, seatMatrixId added by associations
}, {
  timestamps: true,
  tableName: 'applicants'
});

module.exports = Applicant;
