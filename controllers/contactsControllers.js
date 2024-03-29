import ContactModel from "../models/contactModel.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import HttpError from "../utils/httpError.js";

const getAllContacts = async (req, res, next) => {
  const allContacts = await ContactModel.find();
  res.status(200).json({
    message: "Success!",
    data: allContacts,
  });
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await ContactModel.findOne({ _id: id });
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "Success!",
    data: contact,
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const deletedContact = await ContactModel.findByIdAndDelete(id);
  if (!deletedContact) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "Delete success!",
    data: deletedContact,
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404);
  }
  res.status(200).json({
    message: "Success!",
    data: updatedContact,
  });
};

const createContact = async (req, res, next) => {
  const newContact = await ContactModel.create(req.body);
  res.status(200).json({
    message: "Success!",
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
  res.status(200).json({
    message: "Success!",
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
