const { Program, Department } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Program.findAll({ include: [Department] });
    res.json({ success: true, message: 'Programs retrieved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const create = async (req, res) => {
  try {
    const { name, code, duration, totalIntake, courseType, departmentId } = req.body;
    const newProgram = await Program.create({ name, code, duration, totalIntake, courseType, departmentId });
    
    // Fetch with association for frontend
    const populated = await Program.findByPk(newProgram.id, { include: [Department] });
    
    res.status(201).json({ success: true, message: 'Program created', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, duration, totalIntake, courseType, departmentId } = req.body;
    
    const program = await Program.findByPk(id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found', data: {} });
    }

    if (name) program.name = name;
    if (code) program.code = code;
    if (duration) program.duration = duration;
    if (totalIntake) program.totalIntake = totalIntake;
    if (courseType) program.courseType = courseType;
    if (departmentId) program.departmentId = departmentId;
    await program.save();

    // Fetch with association for frontend
    const populated = await Program.findByPk(id, { include: [Department] });

    res.json({ success: true, message: 'Program updated', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Program.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found', data: {} });
    await item.destroy();
    res.json({ success: true, message: 'Deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { getAll, create, update, remove };
