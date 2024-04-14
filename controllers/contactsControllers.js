import ContactModel from "../models/contactModel.js";
import catchAsync from "../utils/catchAsync.js";

const getAllContacts = catchAsync(async (req, res) => {
  const allContacts = await ContactModel.find();

  res.status(200).json(allContacts);
});

const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const contact = await ContactModel.findOne({ _id: id });

  res.status(200).json(contact);
});

const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await ContactModel.findByIdAndDelete(id);

  res.status(200).json(deletedContact);
});

const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

const createContact = catchAsync(async (req, res) => {
  const newContact = await ContactModel.create(req.body);

  res.status(200).json(newContact);
});

const updateStatusContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  updateContact,
  createContact,
  updateStatusContact,
};
