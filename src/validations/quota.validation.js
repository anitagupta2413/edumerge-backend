const { z } = require('zod');

const seatMatrixSchema = z.object({
  body: z.object({
    programId: z.coerce.number().int(),
    totalIntake: z.coerce.number().int().optional(),
    distributions: z.array(z.object({
      quotaId: z.coerce.number().int(),
      totalSeats: z.coerce.number().int().nonnegative('Seats cannot be negative'),
    })).min(1, 'At least one quota distribution is required'),
  }),
});

module.exports = { seatMatrixSchema };
