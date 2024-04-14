import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().required(),
});
