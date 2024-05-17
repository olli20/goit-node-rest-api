import multer from "multer";
import path from "path";

import catchAsync from "../utils/catchAsync.js";
import UserModel from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

import { checkToken } from "../services/jwtService.js";

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

// upload new avatar

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("tmp"));
  },
  filename: (req, file, cbk) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Upload images only"), false);
  }
};

export const uploadAvatar = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("avatar");
