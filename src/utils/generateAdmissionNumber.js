const { Admission } = require('../models');

/**
 * Format: INST/2026/UG/CSE/KCET/0001
 */
const generateAdmissionNumber = async (programCode, quotaName, courseType = 'UG') => {
  const currentYear = new Date().getFullYear();
  const baseFormat = `INST/${currentYear}/${courseType}/${programCode}/${quotaName}`;

  const { Op } = require('sequelize');
  
  // Find the last admission for this format to increment the sequence
  const lastAdmission = await Admission.findOne({
    where: {
      admissionNumber: {
        [Op.like]: `${baseFormat}/%`
      }
    },
    order: [['id', 'DESC']]
  });

  let nextNumber = 1;
  if (lastAdmission && lastAdmission.admissionNumber) {
    const lastNumStr = lastAdmission.admissionNumber.split('/').pop();
    nextNumber = parseInt(lastNumStr, 10) + 1;
  }

  const paddedNumber = nextNumber.toString().padStart(4, '0');
  return `${baseFormat}/${paddedNumber}`;
};

module.exports = {
  generateAdmissionNumber
};
