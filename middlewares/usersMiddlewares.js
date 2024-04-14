import { Types } from "mongoose";

import { UserSchema } from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";

export const checkRegisterData = catchAsync(async (req, res, next) => {
  //validate
  const { value, error } = registerUserSchema;
});
