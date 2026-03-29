const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SeatMatrix = sequelize.define('SeatMatrix', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  filledSeats: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  remainingSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
  // programId, quotaId added by associations
}, {
  timestamps: true,
  tableName: 'seat_matrices'
});

module.exports = SeatMatrix;
