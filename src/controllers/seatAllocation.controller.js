const seatService = require('../services/seat.service');

const allocate = async (req, res) => {
  try {
    const { applicantId, programId, quotaId, seatMatrixId } = req.body;
    
    if (!applicantId) {
      return res.status(400).json({ success: false, message: 'Missing applicantId', data: {} });
    }

    const allocation = await seatService.allocateSeat(applicantId, { seatMatrixId, programId, quotaId });
    res.status(200).json({ success: true, message: 'Seat allocated successfully', data: allocation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const getAvailable = async (req, res) => {
  try {
    const { programId } = req.query;
    if (!programId) {
      return res.status(400).json({ success: false, message: 'Missing programId query param', data: {} });
    }
    const seats = await seatService.getAvailableSeats(programId);
    res.status(200).json({ success: true, message: 'Available seats retrieved', data: seats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { allocate, getAvailable };
