const { z } = require('zod');
const { email, requiredString } = require('./common.schema');

const loginSchema = z.object({
  body: z.object({
    email: email,
    password: requiredString('Password'),
  }),
});

module.exports = { loginSchema };
