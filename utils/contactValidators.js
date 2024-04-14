import Joi from "joi";

import joiValidator from "../utils/joiValidator.js";

export const createContactSchema = joiValidator(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  })
);

export const updateContactSchema = joiValidator(
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
    .min(1)
    .messages({
      "object.min": "Body must have at least one field",
    })
);

export const updateStatusSchema = joiValidator(
  Joi.object({
    favorite: Joi.boolean().required(),
  })
);
