import ContactModel from "../models/contactModel.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res, next) => {
  const allContacts = await ContactModel.find();
  res.json({
    status: "success",
    code: 200,
    data: allContacts,
  });
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findOne(id);
  if (!contact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await ContactModel.findByIdAndDelete(id);
  if (!deletedContact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    message: "Delete success",
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body);
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

const createContact = async (req, res, next) => {
  const newContact = await ContactModel.create(req.body);
  res.json({
    status: "success",
    code: 200,
    data: newContact,
  });
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  createContact: ctrlWrapper(createContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
