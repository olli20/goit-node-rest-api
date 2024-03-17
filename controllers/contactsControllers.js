import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContacts();
  //   console.log(contacts);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const url = req.url;
  const id = url.slice(1);
  const contact = await getContactById(id);
  //   console.log(id);
  res.json(contact);
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
