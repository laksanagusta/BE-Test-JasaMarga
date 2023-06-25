import Joi from "joi";

const registerUserValidation = Joi.object({
  fullname: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  username: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  password: Joi.string().max(100).required(),
  username: Joi.string().max(100).required(),
});

export { registerUserValidation, loginUserValidation };
