const admissionService = require('../services/admission.service');

const confirm = async (req, res) => {
  try {
    // applicantId from params or body
    const { applicantId, feeStatus, documentStatus, admissionConfirmation } = req.body;
    
    if (!applicantId || !feeStatus || !documentStatus) {
      return res.status(400).json({ success: false, message: 'Missing required fields', data: {} });
    }

    const result = await admissionService.confirmAdmission(applicantId, feeStatus, documentStatus, admissionConfirmation);
    res.status(200).json({ success: true, message: 'Admission data updated successfully', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, data: {} });
  }
};

const getAdmissions = async (req, res) => {
  try {
    // Fetch all applicants who have a seat allocated
    const admissions = await admissionService.getAdmissionsList(req.query);
    res.status(200).json({ success: true, message: 'Confirmed admissions retrieved', data: admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: {} });
  }
};

module.exports = { confirm, getAdmissions };
