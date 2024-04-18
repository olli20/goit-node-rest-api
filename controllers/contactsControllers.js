import ContactModel from "../models/contactModel.js";
import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/httpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const owner = req.user._id;
  const allUserContacts = await ContactModel.find({ owner });

  res.status(200).json(allUserContacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const contact = await ContactModel.findOne({ _id: id, owner });

  if (!contact) throw new HttpError(404, "Not found");

  res.status(200).json(contact);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const deletedContact = await ContactModel.findByIdAndDelete({
    _id: id,
    owner,
  });

  if (!deletedContact) throw new HttpError(404, "Contact not found");

  res.status(200).json();
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const contactToUpdate = await ContactModel.findOne({ _id: id, owner });

  if (!contactToUpdate) throw new HttpError(404, "Contact not found");

  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});

export const createContact = catchAsync(async (req, res) => {
  const owner = req.user._id;
  const newContact = await ContactModel.create({ ...req.body, owner });

  res.status(201).json(newContact);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;
  const contactToUpdate = await ContactModel.findOne({ _id: id, owner });

  if (!contactToUpdate) throw new HttpError(404, "Contact not found");

  const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedContact);
});
