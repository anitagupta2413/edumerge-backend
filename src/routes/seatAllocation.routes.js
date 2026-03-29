const express = require('express');
const router = express.Router();
const seatAllocationController = require('../controllers/seatAllocation.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { seatAllocationSchema } = require('../validations/applicant.validation');

// GET /api/seat-allocation?programId=1
router.get('/', verifyToken, seatAllocationController.getAvailable);

// POST /api/seat-allocation
// STAFF and ADMIN can allocate seats
router.post('/', verifyToken, checkRole('ADMIN', 'STAFF'), validate(seatAllocationSchema), seatAllocationController.allocate);

module.exports = router;
