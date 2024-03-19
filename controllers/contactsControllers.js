import {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await deleteContactById(id);
  if (!deletedContact) {
    throw HttpError(404);
  }
  res.status(200).json(deletedContact);
};

const createContact = async (req, res, next) => {
  // const { error } = createContactSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  // const { error } = updateContactSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { id } = req.params;
  const updatedContact = await updateContactById(id, req.body);
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.json(updatedContact);
  res.status(201).json(updatedContact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
