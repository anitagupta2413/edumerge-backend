const { Program, SeatMatrix, Applicant, Quota, sequelize } = require('../models');

const createSeatMatrix = async (programId, distributions, totalIntake = null) => {
  // distributions: [{ quotaId: 1, totalSeats: 50 }, { quotaId: 2, totalSeats: 30 }]
  
  // Transaction to ensure atomic creation
  const t = await sequelize.transaction();
  try {
    const program = await Program.findByPk(programId, { transaction: t });
    if (!program) throw new Error('Program not found');

    // Update program intake if provided from the matrix page
    if (totalIntake !== null && totalIntake !== undefined) {
      program.totalIntake = Number(totalIntake);
      await program.save({ transaction: t });
    }

    const totalCalculated = distributions.reduce((sum, d) => sum + d.totalSeats, 0);
    
    if (totalCalculated !== program.totalIntake) {
      throw new Error(`Sum of quotas (${totalCalculated}) does not match program total intake (${program.totalIntake}). Please adjust distributions.`);
    }

    // Delete existing matrix for this program if re-defining
    await SeatMatrix.destroy({ where: { programId }, transaction: t });

    const matrixData = distributions.map(d => ({
      programId: program.id,
      quotaId: d.quotaId,
      totalSeats: d.totalSeats,
      filledSeats: 0,
      remainingSeats: d.totalSeats
    }));

    const newMatrices = await SeatMatrix.bulkCreate(matrixData, { transaction: t });
    await t.commit();
    return newMatrices;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAvailableSeats = async (programId) => {
  const matrices = await SeatMatrix.findAll({
    where: { programId },
    include: [Quota]
  });
  
  return matrices.map(m => {
    const json = m.toJSON();
    const quotaObj = json.Quotum || json.Quota;
    return {
      ...json,
      quotaName: quotaObj ? quotaObj.name : 'Unknown'
    };
  });
};

const allocateSeat = async (applicantId, { seatMatrixId, programId, quotaId }) => {
  const t = await sequelize.transaction();
  try {
    const applicant = await Applicant.findByPk(applicantId, { transaction: t });
    if (!applicant) throw new Error('Applicant not found');
    
    if (applicant.status !== 'NEW') {
      throw new Error(`Applicant status is ${applicant.status}. Can only allocate seats to NEW applicants.`);
    }

    let seatMatrix;
    if (seatMatrixId) {
      seatMatrix = await SeatMatrix.findByPk(seatMatrixId, { transaction: t, lock: true });
    } else if (programId && quotaId) {
      seatMatrix = await SeatMatrix.findOne({
        where: { programId, quotaId },
        transaction: t,
        lock: true
      });
    }

    if (!seatMatrix) throw new Error('Seat Matrix not found for the given criteria');

    if (seatMatrix.remainingSeats <= 0) {
      throw new Error('No seats available for this quota combination');
    }

    // Allocate
    seatMatrix.remainingSeats -= 1;
    seatMatrix.filledSeats += 1;
    await seatMatrix.save({ transaction: t });

    applicant.status = 'ALLOCATED';
    applicant.seatAllocated = true;
    applicant.seatMatrixId = seatMatrix.id;
    await applicant.save({ transaction: t });

    await t.commit();
    return { applicant, seatMatrix };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  createSeatMatrix,
  getAvailableSeats,
  allocateSeat
};
