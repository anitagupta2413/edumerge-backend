const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { departmentSchema } = require('../validations/structure.validation');

// For now ignoring RBAC checks as requested, or just leaving verifyToken
router.get('/', verifyToken, departmentController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), validate(departmentSchema), departmentController.create);
router.put('/:id', verifyToken, checkRole('ADMIN'), validate(departmentSchema), departmentController.update);
router.delete('/:id', verifyToken, checkRole('ADMIN'), departmentController.remove);

module.exports = router;
