import { Types } from "mongoose";

import { HttpError } from "../utils/httpError.js";
import { ContactModel } from "../models/contactModel.js";

const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};

const checkContactId = async (id) => {
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, "Contact not found..");

  const userExists = await ContactModel.exists({ _id: id });
  // const userExists = await User.findById(id).select('_id');

  if (!userExists) throw new HttpError(404, "User not found..");
};

const checkContactMiddleware = catchAsync(async (req, res, next) => {
  await checkContactId(req.params.id);

  next();
});

export { checkContactMiddleware };
