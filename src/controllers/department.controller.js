const { Department, Campus } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Department.findAll({ include: [Campus] });
    res.json({ success: true, message: 'Departments retrieved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const create = async (req, res) => {
  try {
    const { name, code, hod, campusId } = req.body;
    const newDept = await Department.create({ name, code, hod, campusId });
    
    // Fetch with association for frontend
    const populated = await Department.findByPk(newDept.id, { include: [Campus] });
    
    res.status(201).json({ success: true, message: 'Department created', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, hod, campusId } = req.body;
    
    const dept = await Department.findByPk(id);
    if (!dept) return res.status(404).json({ success: false, message: 'Not found', data: {} });

    if (name) dept.name = name;
    if (code) dept.code = code;
    if (hod) dept.hod = hod;
    if (campusId) dept.campusId = campusId;
    
    await dept.save();

    // Fetch with association for frontend
    const populated = await Department.findByPk(id, { include: [Campus] });

    res.json({ success: true, message: 'Department updated', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const dept = await Department.findByPk(id);
    if (!dept) return res.status(404).json({ success: false, message: 'Not found', data: {} });

    await dept.destroy();
    res.json({ success: true, message: 'Department deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { getAll, create, update, remove };
