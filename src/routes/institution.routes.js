const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institution.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { institutionSchema } = require('../validations/institution.validation');

router.get('/', verifyToken, institutionController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), validate(institutionSchema), institutionController.create);
router.put('/:id', verifyToken, checkRole('ADMIN'), validate(institutionSchema), institutionController.update);
router.delete('/:id', verifyToken, checkRole('ADMIN'), institutionController.remove);

module.exports = router;
