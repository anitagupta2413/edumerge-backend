const { Applicant, Admission, Program, Quota, sequelize } = require('../models');
const { generateAdmissionNumber } = require('../utils/generateAdmissionNumber');

const confirmAdmission = async (applicantId, feeStatus, documentStatus, admissionConfirmation) => {
  const t = await sequelize.transaction();
  try {
    const applicant = await Applicant.findByPk(applicantId, {
      include: ['Program', 'Quota'],
      transaction: t,
      lock: true
    });

    if (!applicant) throw new Error('Applicant not found');
    
    // Fee status must be PAID to confirm
    if (admissionConfirmation && feeStatus !== 'PAID') {
      throw new Error('Fee status must be PAID to confirm admission');
    }

    // Update applicant status if confirmed
    if (admissionConfirmation) {
      applicant.status = 'CONFIRMED';
    }
    await applicant.save({ transaction: t });

    // Handle Admission record (Create or Update)
    let admission = await Admission.findOne({ where: { applicantId }, transaction: t });
    
    const admissionData = {
      applicantId: applicant.id,
      feeStatus: feeStatus === 'PAID' ? 'PAID' : 'PENDING',
      documentStatus: documentStatus || 'PENDING',
      admissionConfirmation: !!admissionConfirmation
    };

    if (!admission) {
      // First time setting data or confirming
      // If confirming, generate the number
      if (admissionConfirmation) {
        admissionData.admissionNumber = await generateAdmissionNumber(applicant.Program.code, applicant.Quota.name, applicant.Program.courseType);
      } else {
        admissionData.admissionNumber = 'PENDING'; // Placeholder until confirmed
      }
      admission = await Admission.create(admissionData, { transaction: t });
    } else {
      // Record exists, update it
      // If confirming and currently PENDING, generate the number
      if (admissionConfirmation && (admission.admissionNumber === 'PENDING' || !admission.admissionNumber)) {
        admissionData.admissionNumber = await generateAdmissionNumber(applicant.Program.code, applicant.Quota.name, applicant.Program.courseType);
      }
      Object.assign(admission, admissionData);
      await admission.save({ transaction: t });
    }

    await t.commit();
    return { applicant, admission };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAdmissionsList = async (filters = {}) => {
  // We want all applicants where seatAllocated is true
  const list = await Applicant.findAll({
    where: { ...filters, seatAllocated: true },
    include: [
      { model: Program, as: 'Program' },
      { model: Quota, as: 'Quota' },
      { model: Admission }
    ]
  });
  return list;
};

module.exports = {
  confirmAdmission,
  getAdmissionsList
};
