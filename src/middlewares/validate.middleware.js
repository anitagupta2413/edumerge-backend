const validate = (schema) => (req, res, next) => {
  try {
    // Check which keys are defined in the schema to avoid "unrecognized key" errors
    const dataToValidate = {};
    const schemaKeys = Object.keys(schema.shape);

    if (schemaKeys.includes('body')) dataToValidate.body = req.body;
    if (schemaKeys.includes('query')) dataToValidate.query = req.query;
    if (schemaKeys.includes('params')) dataToValidate.params = req.params;

    const parsed = schema.parse(dataToValidate);

    // Only update request fields if they were part of the schema validation
    if (parsed.hasOwnProperty('body')) req.body = parsed.body;
    if (parsed.hasOwnProperty('query')) req.query = parsed.query;
    if (parsed.hasOwnProperty('params')) req.params = parsed.params;

    next();
  } catch (err) {

    // If it's not a Zod error, pass it to the global error handler
    if (!err.errors) {
      return next(err);
    }

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors.map((e) => ({
        path: e.path.join('.').replace('body.', ''),
        message: e.message,
      })),
    });
  }
};

module.exports = validate;
