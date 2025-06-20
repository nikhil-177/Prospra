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
      console.log(error);
      const errors = error.details.map((e) => ({
        message: e.message,
        field: e.context.key,
      }));
      throw new AppError(error.name, 400, errors);
    }

    req.validatedData = value;
    next();
  };
};
