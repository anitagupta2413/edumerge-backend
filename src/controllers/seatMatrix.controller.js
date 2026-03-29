const seatService = require('../services/seat.service');

const create = async (req, res) => {
  try {
    const { programId, distributions, totalIntake } = req.body;
    // distributions must be array: [{quotaId, totalSeats}, ...]
    if (!programId || !distributions || !Array.isArray(distributions)) {
      return res.status(400).json({ success: false, message: 'Invalid input', data: {} });
    }

    const matrices = await seatService.createSeatMatrix(programId, distributions, totalIntake);
    res.status(201).json({ success: true, message: 'Seat matrix created', data: matrices });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const getByProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const matrices = await seatService.getAvailableSeats(programId);
    res.status(200).json({ success: true, message: 'Seat matrices retrieved', data: matrices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const getAll = async (req, res) => {
  try {
    const { SeatMatrix, Program, Quota } = require('../models');
    
    // Fetch all Seat Matrices and include associated Program and Quota
    const matrices = await SeatMatrix.findAll({
      include: [
        { model: Program },
        { model: Quota }
      ]
    });
    
    // Group exactly as requested: Program with a details array of Seat Matrices
    const grouped = {};
    matrices.forEach(m => {
      const data = m.toJSON();
      const progId = data.programId;
      
      if (!grouped[progId]) {
        grouped[progId] = {
          programId: progId,
          Program: data.Program,
          details: []
        };
      }
      
      // Sequelize singularization auto-aliases 'Quota' to 'Quotum' in JSON output.
      // We normalize it back to 'Quota' for the frontend.
      const quotaData = data.Quotum || data.Quota;
      
      grouped[progId].details.push({
        id: data.id,
        totalSeats: data.totalSeats,
        filledSeats: data.filledSeats,
        remainingSeats: data.remainingSeats,
        programId: data.programId,
        quotaId: data.quotaId,
        Quota: quotaData
      });
    });
    
    const result = Object.values(grouped);
    
    res.status(200).json({ success: true, message: 'All matrices retrieved', data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { create, getByProgram, getAll };
