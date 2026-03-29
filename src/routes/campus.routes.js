const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campus.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { campusSchema } = require('../validations/structure.validation');

router.get('/', verifyToken, campusController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), validate(campusSchema), campusController.create);
router.put('/:id', verifyToken, checkRole('ADMIN'), validate(campusSchema), campusController.update);
router.delete('/:id', verifyToken, checkRole('ADMIN'), campusController.remove);

module.exports = router;
