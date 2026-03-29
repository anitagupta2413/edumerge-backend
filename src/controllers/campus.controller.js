const { Campus, Institution } = require('../models');

const getAll = async (req, res) => {
  try {
    const data = await Campus.findAll({ include: [Institution] });
    res.json({ success: true, message: 'Campuses retrieved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const create = async (req, res) => {
  try {
    let { name, code, location, institutionId } = req.body;
    
    // Auto-attach first institution if ID is missing (for single-tenant logic)
    if (!institutionId) {
      const inst = await Institution.findOne();
      if (inst) institutionId = inst.id;
    }

    const newCampus = await Campus.create({ name, code, location, institutionId });
    // Fetch with association for frontend
    const populated = await Campus.findByPk(newCampus.id, { include: [Institution] });
    
    res.status(201).json({ success: true, message: 'Campus created', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, code, location, institutionId } = req.body;
    
    const campus = await Campus.findByPk(id);
    if (!campus) {
      return res.status(404).json({ success: false, message: 'Campus not found', data: {} });
    }

    // Auto-attach if missing on update too, to ensure data integrity
    if (!institutionId && !campus.institutionId) {
      const inst = await Institution.findOne();
      if (inst) institutionId = inst.id;
    }

    if (name) campus.name = name;
    if (code) campus.code = code;
    if (location) campus.location = location;
    if (institutionId) campus.institutionId = institutionId;
    await campus.save();

    // Fetch with association for frontend
    const populated = await Campus.findByPk(id, { include: [Institution] });

    res.json({ success: true, message: 'Campus updated', data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Campus.findByPk(id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found', data: {} });
    await item.destroy();
    res.json({ success: true, message: 'Deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { getAll, create, update, remove };
