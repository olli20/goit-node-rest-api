import Joi from "joi";

import joiValidator from "../utils/joiValidator.js";

export const createContactDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean(),
    })
    .validate(data)
);

export const updateContactDataValidator = joiValidator((data) =>
  Joi.object()
    .options({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .min(1)
    .messages({
      "object.min": "Body must have at least one field",
    })
    .validate(data)
);

export const updateStatusDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      favorite: Joi.boolean().required(),
    })
    .validate(data)
);
