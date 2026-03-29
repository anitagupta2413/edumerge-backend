const sequelize = require('../config/db');

const User = require('./User');
const Institution = require('./Institution');
const Campus = require('./Campus');
const Department = require('./Department');
const Program = require('./Program');
const Quota = require('./Quota');
const SeatMatrix = require('./SeatMatrix');
const Applicant = require('./Applicant');
const Admission = require('./Admission');

// Associations

// Institution 1:N Campus
Institution.hasMany(Campus, { foreignKey: 'institutionId' });
Campus.belongsTo(Institution, { foreignKey: 'institutionId' });

// Campus 1:N Department
Campus.hasMany(Department, { foreignKey: 'campusId' });
Department.belongsTo(Campus, { foreignKey: 'campusId' });

// Department 1:N Program
Department.hasMany(Program, { foreignKey: 'departmentId' });
Program.belongsTo(Department, { foreignKey: 'departmentId' });

// Program 1:N SeatMatrix
Program.hasMany(SeatMatrix, { foreignKey: 'programId' });
SeatMatrix.belongsTo(Program, { foreignKey: 'programId' });

// Quota 1:N SeatMatrix
Quota.hasMany(SeatMatrix, { foreignKey: 'quotaId' });
SeatMatrix.belongsTo(Quota, { foreignKey: 'quotaId' });

// Program 1:N Applicant
Program.hasMany(Applicant, { foreignKey: 'programId' });
Applicant.belongsTo(Program, { foreignKey: 'programId', as: 'Program' });

// Quota 1:N Applicant
Quota.hasMany(Applicant, { foreignKey: 'quotaId' });
Applicant.belongsTo(Quota, { foreignKey: 'quotaId', as: 'Quota' });

// SeatMatrix 1:N Applicant
SeatMatrix.hasMany(Applicant, { foreignKey: 'seatMatrixId' });
Applicant.belongsTo(SeatMatrix, { foreignKey: 'seatMatrixId', as: 'SeatMatrix' });

// Applicant 1:1 Admission
Applicant.hasOne(Admission, { foreignKey: 'applicantId' });
Admission.belongsTo(Applicant, { foreignKey: 'applicantId' });

module.exports = {
  sequelize,
  User,
  Institution,
  Campus,
  Department,
  Program,
  Quota,
  SeatMatrix,
  Applicant,
  Admission
};
