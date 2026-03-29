const express = require('express');
const router = express.Router();
const programController = require('../controllers/program.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { programSchema } = require('../validations/structure.validation');

router.get('/', verifyToken, programController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), validate(programSchema), programController.create);
router.put('/:id', verifyToken, checkRole('ADMIN'), validate(programSchema), programController.update);
router.delete('/:id', verifyToken, checkRole('ADMIN'), programController.remove);

module.exports = router;
