const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicant.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { applicantSchema } = require('../validations/applicant.validation');

// Anyone logged in can view
router.get('/', verifyToken, applicantController.getAll);

// STAFF and ADMIN can create and update applicants
router.post('/', verifyToken, checkRole('ADMIN', 'STAFF'), validate(applicantSchema), applicantController.create);
router.put('/:id', verifyToken, checkRole('ADMIN', 'STAFF'), validate(applicantSchema), applicantController.update);
router.delete('/:id', verifyToken, checkRole('ADMIN'), applicantController.remove);

module.exports = router;
