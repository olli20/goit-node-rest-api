import {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContactById,
} from "../services/contactsServices.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

// const getOneContact = async (req, res, next) => {
//   const { id } = req.params;
//   const contact = await getContactById(id);
//   if (!contact) {
//     throw HttpError(404);
//   }
//   res.status(200).json(contact);
// };

// const deleteContact = async (req, res, next) => {
//   const { id } = req.params;
//   const deletedContact = await removeContact(id);
//   if (!deletedContact) {
//     throw HttpError(404);
//   }
//   res.status(200).json(deletedContact);
// };

// const createContact = async (req, res, next) => {
//   const newContact = await addContact(req.body);
//   res.status(201).json(newContact);
// };

// const updateContact = async (req, res, next) => {
//   const { id } = req.params;
//   const updatedContact = await updateContactById(id, req.body);
//   if (!updatedContact) {
//     throw HttpError(404);
//   }
//   res.status(200).json(updatedContact);
// };

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  // getOneContact: ctrlWrapper(getOneContact),
  // deleteContact: ctrlWrapper(deleteContact),
  // createContact: ctrlWrapper(createContact),
  // updateContact: ctrlWrapper(updateContact),
};
