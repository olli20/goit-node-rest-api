import { Schema, model } from "mongoose";
import Joi from "joi";

export const contact = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "Body must have at least one field",
  });
