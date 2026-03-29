const { z } = require('zod');
const { email, phone, requiredString } = require('./common.schema');

const applicantSchema = z.object({
  body: z.object({
    name: requiredString('Full Name'),
    email: email,
    phone: phone,
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format').optional(),
    programId: z.coerce.number().int(),
    quotaId: z.coerce.number().int(),
    category: z.string().optional(),
    entryType: z.string().optional(),
    marks: z.coerce.number().min(0, 'Marks cannot be negative').max(100, 'Marks cannot exceed 100').optional(),
    allotmentNumber: z.string().optional(),
    docStatus: z.enum(['Pending', 'Submitted', 'Verified']).default('Pending'),
  }),
});

const seatAllocationSchema = z.object({
  body: z.object({
    applicantId: z.number().int(),
    programId: z.number().int(),
    quotaId: z.number().int(),
  }),
});

const admissionConfirmSchema = z.object({
  body: z.object({
    applicantId: z.coerce.number().int(),
    feeStatus: z.enum(['PENDING', 'PAID']),
    documentStatus: z.string().optional(),
    admissionConfirmation: z.boolean().optional(),
    feesPaid: z.coerce.number().min(0).optional(),
    paymentMethod: z.string().optional(),
  }),
});

module.exports = { applicantSchema, seatAllocationSchema, admissionConfirmSchema };
