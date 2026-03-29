const { z } = require('zod');

// International phone number regex
// Allows + at the start, spaces, and digits. 
// Strict 10-digit phone number regex
const phoneRegex = /^\d{10}$/;

const commonSchemas = {
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  academicYear: z.string().regex(/^\d{4}(-\d{2,4})?$/, 'Academic year must be in YYYY, YYYY-YY, or YYYY-YYYY format (e.g. 2025-26)'),
  positiveInt: z.number().int().nonnegative('Must be a non-negative integer'),
  requiredString: (name) => z.string().min(1, `${name} is required`),
};

module.exports = commonSchemas;
