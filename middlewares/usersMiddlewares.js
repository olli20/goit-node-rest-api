import { Types } from "mongoose";

import UserModel from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/httpError.js";
import { checkUserExistsService } from "../services/userService.js";
import {
  loginUserDataValidator,
  registerUserDataValidator,
} from "../utils/userValidators.js";

export const checkRegisterData = catchAsync(async (req, res, next) => {
  const { value, errors } = registerUserDataValidator(req.body);

  if (errors) {
    throw new HttpError(400, "Bad Request", {
      message: "Помилка від Joi або іншої бібліотеки валідації",
    });
  }

  const userExists = await checkUserExistsService({ email: value.email });

  if (userExists) {
    throw new HttpError(409, "Conflict", {
      message: "Email in use",
    });
  }

  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, errors } = loginUserDataValidator(req.body);

  if (errors)
    throw new HttpError(400, "Bad Request", {
      message: "Помилка від Joi або іншої бібліотеки валідації",
    });

  req.body = value;

  next();
};
