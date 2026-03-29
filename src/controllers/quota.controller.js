const { Quota } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Quota.findAll();
    res.json({ success: true, message: 'Quotas retrieved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const newQuota = await Quota.create({ name });
    res.status(201).json({ success: true, message: 'Quota created', data: newQuota });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { Quota } = require('../models');
    const { id } = req.params;
    const item = await Quota.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found', data: {} });
    await item.destroy();
    res.json({ success: true, message: 'Deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { getAll, create, remove };
