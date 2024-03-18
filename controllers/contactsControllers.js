import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params; // const id = url.slice(1);
    const contact = await getContactById(id);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
    console.log(deletedContact);
    if (!deletedContact) {
      throw HttpError(404);
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {};
