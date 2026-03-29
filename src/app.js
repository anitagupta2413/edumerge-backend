const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple routing test
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to edumerge API.' });
});

const authRoutes = require('./routes/auth.routes');
const institutionRoutes = require('./routes/institution.routes');
const campusRoutes = require('./routes/campus.routes');
const departmentRoutes = require('./routes/department.routes');
const programRoutes = require('./routes/program.routes');
const quotaRoutes = require('./routes/quota.routes');
const seatMatrixRoutes = require('./routes/seatMatrix.routes');
const seatAllocationRoutes = require('./routes/seatAllocation.routes');
const applicantRoutes = require('./routes/applicant.routes');
const admissionRoutes = require('./routes/admission.routes');

app.use('/api/auth', authRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/campuses', campusRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/quotas', quotaRoutes);
app.use('/api/seat-matrix', seatMatrixRoutes);
app.use('/api/seat-allocation', seatAllocationRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/admissions', admissionRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: {}
  });
});

module.exports = app;
