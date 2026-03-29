const applicantService = require('../services/applicant.service');

const create = async (req, res) => {
  try {
    const applicant = await applicantService.createApplicant(req.body);
    res.status(201).json({ success: true, message: 'Applicant created', data: applicant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const getAll = async (req, res) => {
  try {
    const filters = req.query; // e.g. ?status=NEW
    const applicants = await applicantService.getApplicants(filters);
    res.status(200).json({ success: true, message: 'Applicants retrieved', data: applicants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await applicantService.updateApplicant(id, req.body);
    res.status(200).json({ success: true, message: 'Applicant updated', data: applicant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await applicantService.deleteApplicant(id);
    res.status(200).json({ success: true, message: 'Applicant deleted', data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { create, getAll, update, remove };
