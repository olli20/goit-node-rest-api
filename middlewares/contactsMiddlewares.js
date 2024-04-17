import { Types } from "mongoose";

import ContactModel from "../models/contactModel.js";

import HttpError from "../utils/httpError.js";
import catchAsync from "../utils/catchAsync.js";

const checkContactId = async (id) => {
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, "It's not a valid Id");

  const userExists = await ContactModel.exists({ _id: id });
  // const userExists = await User.findById(id).select('_id');

  if (!userExists) throw new HttpError(404, "User ist not found");
};

const checkContactMiddleware = catchAsync(async (req, res, next) => {
  await checkContactId(req.params.id);
  next();
});

export { checkContactMiddleware };
