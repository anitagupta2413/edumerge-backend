const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Program = sequelize.define('Program', {
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
  duration: {
    type: DataTypes.STRING,
    allowNull: true
  },
  totalIntake: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  courseType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'UG'
  }
  // departmentId will be added by associations
}, {
  timestamps: true,
  tableName: 'programs'
});

module.exports = Program;
