import Joi from "joi";

import joiValidator from "../utils/joiValidator.js";

export const registerUserSchema = joiValidator(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().required(),
  })
);
