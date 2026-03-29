const { z } = require('zod');
const { requiredString } = require('./common.schema');

const campusSchema = z.object({
  body: z.object({
    name: requiredString('Campus Name'),
    code: requiredString('Campus Code'),
    location: requiredString('Location'),
    institutionId: z.coerce.number().int().optional(),
  }),
});

const departmentSchema = z.object({
  body: z.object({
    name: requiredString('Department Name'),
    code: requiredString('Department Code'),
    hod: requiredString('HOD Name'),
    campusId: z.coerce.number().int(),
  }),
});

const programSchema = z.object({
  body: z.object({
    name: requiredString('Program Name'),
    code: requiredString('Program Code'),
    duration: requiredString('Duration'),
    totalIntake: z.coerce.number().int().positive('Total Intake must be greater than 0'),
    courseType: z.enum(['UG', 'PG'], 'Course Type must be UG or PG'),
    departmentId: z.coerce.number().int(),
  }),
});

module.exports = { campusSchema, departmentSchema, programSchema };
