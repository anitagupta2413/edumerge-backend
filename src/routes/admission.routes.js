const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { admissionConfirmSchema } = require('../validations/applicant.validation');

router.get('/', verifyToken, admissionController.getAdmissions);

// STAFF and ADMIN can confirm admissions
router.post('/confirm', verifyToken, checkRole('ADMIN', 'STAFF'), validate(admissionConfirmSchema), admissionController.confirm);

module.exports = router;
