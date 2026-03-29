const { Institution } = require('../models');

// Getting all institutions
const getAll = async (req, res) => {
  try {
    const data = await Institution.findAll();
    res.json({ success: true, message: 'Institutions retrieved', data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const create = async (req, res) => {
  try {
    const { name, code, academicYear, courseType } = req.body;
    const newInstitution = await Institution.create({ name, code, academicYear, courseType });
    res.status(201).json({ success: true, message: 'Institution created', data: newInstitution });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const update = async (req, res) => {
  try {
    console.log(req.params, "req.paramsreq.params")
    const { id } = req.params;
    const { name, code, academicYear, courseType } = req.body;

    const institution = await Institution.findByPk(id);
    if (!institution) {
      return res.status(404).json({ success: false, message: 'Institution not found', data: {} });
    }

    if (name) institution.name = name;
    if (code) institution.code = code;
    if (academicYear) institution.academicYear = academicYear;
    if (courseType) institution.courseType = courseType;
    await institution.save();

    res.json({ success: true, message: 'Institution updated', data: institution });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const institution = await Institution.findByPk(id);
    if (!institution) return res.status(404).json({ success: false, message: 'Not found', data: {} });
    await institution.destroy();
    res.json({ success: true, message: 'Institution deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { getAll, create, update, remove };
