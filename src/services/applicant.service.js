const { Admission, Applicant, Program, Quota, sequelize } = require('../models');

const createApplicant = async (data) => {
  const t = await sequelize.transaction();
  try {
    const newApplicant = await Applicant.create({
      ...data,
      seatMatrixId: null,
      seatAllocated: false,
      status: 'NEW'
    }, { transaction: t });

    const result = await Applicant.findByPk(newApplicant.id, { 
      include: [
        { model: Program, as: 'Program' }, 
        { model: Quota, as: 'Quota' }
      ], 
      transaction: t 
    });
    const json = result.toJSON();
    
    await t.commit();

    return {
      ...json,
      Program: json.Program || null,
      Quota: json.Quotum || json.Quota || null
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getApplicants = async (filters = {}) => {
  const applicants = await Applicant.findAll({
    where: filters,
    include: [
      { model: Program, as: 'Program' }, 
      { model: Quota, as: 'Quota' },
      { model: Admission, as: 'Admission' }
    ]
  });
  
  return applicants.map(a => {
    const json = a.toJSON();
    return {
      ...json,
      Program: json.Program || null,
      Quota: json.Quotum || json.Quota || null
    };
  });
};

const updateApplicant = async (id, updateData) => {
  const t = await sequelize.transaction();
  try {
    const applicant = await Applicant.findByPk(id, { transaction: t });
    if (!applicant) throw new Error('Applicant not found');

    // No longer automatically assigning seatMatrixId on program/quota change
    // as per user request to keep allocation manual.
    
    // Update all provided fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        applicant[key] = updateData[key];
      }
    });

    await applicant.save({ transaction: t });
    
    // Return populated for frontend
    const result = await Applicant.findByPk(id, { 
      include: [
        { model: Program, as: 'Program' }, 
        { model: Quota, as: 'Quota' }
      ], 
      transaction: t 
    });
    const json = result.toJSON();

    await t.commit();

    return {
      ...json,
      Program: json.Program || null,
      Quota: json.Quotum || json.Quota || null
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const deleteApplicant = async (id) => {
  const applicant = await Applicant.findByPk(id);
  if (!applicant) throw new Error('Applicant not found');
  await applicant.destroy();
  return true;
};

module.exports = {
  createApplicant,
  getApplicants,
  updateApplicant,
  deleteApplicant
};
