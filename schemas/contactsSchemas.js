import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
});

export const updateContactSchema = Joi.object({});
