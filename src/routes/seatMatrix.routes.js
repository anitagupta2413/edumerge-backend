const express = require('express');
const router = express.Router();
const seatMatrixController = require('../controllers/seatMatrix.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { seatMatrixSchema } = require('../validations/quota.validation');

router.get('/', verifyToken, seatMatrixController.getAll);
router.get('/:programId', verifyToken, seatMatrixController.getByProgram);
router.post('/', verifyToken, checkRole('ADMIN'), validate(seatMatrixSchema), seatMatrixController.create);

module.exports = router;
