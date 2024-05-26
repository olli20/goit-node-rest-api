import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import { signToken } from "../services/jwtService.js";
import Jimp from "jimp";

import catchAsync from "../utils/catchAsync.js";
import UserModel from "../models/userModel.js";
import HttpError from "../utils/httpError.js";
import sendEmail from "../services/sendEmail.js";

const { HOST_URL } = process.env;

export const createUser = catchAsync(async (req, res) => {
  const verificationToken = v4();

  const user = await UserModel.create({ ...req.body, verificationToken });

  user.password = undefined;

  //sending email
  // sgMail.setApiKey(SENDGRID_API_KEY);

  // const message = {
  //   to: user.email,
  //   from: SEND_EMAIL,
  //   subject: "Verification",
  //   html: `<a target="_blank" href ="${HOST_URL}/api/users/verify/${verificationToken}"> Verify your email please!</a>`,
  // };

  // sgMail
  //   .send(message)
  //   .then((info) => console.log(info))
  //   .catch((err) => console.log(err));

  // Sending verification email
  const emailHtml = `<a target="_blank" href ="${HOST_URL}/api/users/verify/${verificationToken}"> Verify your email please!</a>`;
  await sendEmail(user.email, "Verification", emailHtml);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
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

  if (!user.verify) throw new HttpError(401, "Please, verify your email first");

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

export const verificationToken = catchAsync(async (req, res, next) => {
  const userToken = await req.params.verificationToken;
  console.log(userToken);

  if (!userToken) throw new HttpError(404, "User not found");

  const user = await UserModel.findOne({ verificationToken: userToken });

  if (!user) throw new HttpError(404, "User not found");

  await UserModel.findByIdAndUpdate(
    user.id,
    {
      verificationToken: null,
      verify: true,
    },
    { new: true }
  );

  res.status(202).json({ message: "Verification successfulll" });
});

export const verifyUser = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) throw new HttpError(400, "Missing required field email");

  const contact = await User.findOne({ email });

  if (contact.verify === true)
    throw HttpError(400, "Verification has already been passed");

  // Send verification email
  const emailHtml = `<a target="_blank" href ="${HOST_URL}/api/users/verify/${verificationToken}"> Verify your email please!</a>`;
  await sendEmail(email, "Verification", emailHtml);

  res.status(200).json({ message: "Verification email sent" });
});
