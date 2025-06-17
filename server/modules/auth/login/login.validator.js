import joi from 'joi';

export const loginValidator = joi.object({
  identifier: joi.string().required(),
  password: joi.string().min(6).required(),
});
