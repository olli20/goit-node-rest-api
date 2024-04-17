import Joi from "joi";

import joiValidator from "../utils/joiValidator.js";

export const registerUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      subscription: Joi.string().required(),
    })
    .validate(data)
);

export const loginUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    .validate(data)
);
