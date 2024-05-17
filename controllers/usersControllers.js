import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import { signToken } from "../services/jwtService.js";
import Jimp from "jimp";

import catchAsync from "../utils/catchAsync.js";
import UserModel from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

export const createUser = catchAsync(async (req, res) => {
  const user = await UserModel.create(req.body);

  user.password = undefined;

  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user)
    throw new HttpError(401, "Unauthorized", {
      message: "Email or password is wrong",
    });

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid)
    throw new HttpError(401, "Unauthorized", {
      message: "Email or password is wrong",
    });

  user.password = undefined;

  const token = signToken(user.id);

  await UserModel.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      user: user.subscription,
    },
  });
});

export const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

export const logoutUser = catchAsync(async (req, res) => {
  const { id } = req.user;

  const user = await UserModel.findById(id);
  if (!user) {
    throw new HttpError(401, "Unauthorized");
  }

  await UserModel.findByIdAndUpdate(id, { token: null });

  res.sendStatus(204);
});

export const updateAvatar = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  if (!req.file) {
    return new HttpError(400, "File not uploaded");
  }

  const { path: tmpUpload, originalname } = req.file;
  const filename = `${id}-${v4()}-${originalname}`;
  const finalPath = path.join("public", "avatars", filename);

  try {
    const image = await Jimp.read(tmpUpload);
    await image.resize(250, 250).writeAsync(tmpUpload);

    await fs.rename(tmpUpload, finalPath);

    const updateAvatarURL = path.join("/avatars", filename);
    const user = await UserModel.findByIdAndUpdate(
      id,
      { avatarURL: updateAvatarURL },
      { new: true }
    );

    res.status(200).json({
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpUpload).catch(() => {});
    next(error);
  }
});
