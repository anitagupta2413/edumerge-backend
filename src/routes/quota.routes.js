const express = require('express');
const router = express.Router();
const quotaController = require('../controllers/quota.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { checkRole } = require('../middlewares/role.middleware');

router.get('/', verifyToken, quotaController.getAll);
router.post('/', verifyToken, checkRole('ADMIN'), quotaController.create);
router.delete('/:id', verifyToken, checkRole('ADMIN'), quotaController.remove);

module.exports = router;
