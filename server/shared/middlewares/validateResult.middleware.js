import AppError from '../utils/appError.js';

export const validateResult = (schema) => {
  return async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new AppError('Provide data to do Something', 400);
    }

    const { error, value } = await schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new AppError(error.name, 400, errors);
    }

    req.validatedData = value;
    next();
  };
};
