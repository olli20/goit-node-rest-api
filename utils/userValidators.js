import Joi from "joi";

import joiValidator from "../utils/joiValidator.js";

export const registerUserDataValidator = joiValidator(
  Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().required(),
  }).options({ abortEarly: false })
);

export const loginUserDataValidator = joiValidator(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false })
);
