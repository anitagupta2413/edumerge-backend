const { z } = require('zod');
const { email, phone, academicYear, positiveInt, requiredString } = require('./common.schema');

const institutionSchema = z.object({
  body: z.object({
    name: requiredString('Institution Name'),
    code: requiredString('Institution Code'),
    academicYear: academicYear,
    courseType: z.string().optional().nullable(),
  }),
});

module.exports = { institutionSchema };
