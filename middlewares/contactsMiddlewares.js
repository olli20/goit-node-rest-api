import { Types } from "mongoose";

import ContactModel from "../models/contactModel.js";
import HttpError from "../utils/httpError.js";
import catchAsync from "../utils/catchAsync.js";

const checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, "It's not a valid Id");

  const contactExists = await ContactModel.exists({ _id: id });

  if (!contactExists) throw new HttpError(404, "Contact not found");

  next();
});

export { checkContactId };
