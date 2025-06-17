import joi from 'joi';

export const registerValidator = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  username: joi.string().required(),
});
