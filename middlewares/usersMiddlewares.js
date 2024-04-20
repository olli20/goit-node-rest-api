import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/httpError.js";

import UserModel from "../models/userModel.js";

import { checkToken } from "../services/jwtService.js";
import { ImageService } from "../services/imageService.js";

export const checkRegisterData = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const userExists = await UserModel.exists({ email });

  if (userExists) {
    throw new HttpError(409, "Conflict", {
      message: "Email in use",
    });
  }

  next();
});

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = checkToken(token);

  if (!userId)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  const currentUser = await UserModel.findById(userId);

  if (!currentUser)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  req.user = currentUser;

  next();
});

export const uploadAvatar = ImageService.initUploadImageMiddleware("avatar");
