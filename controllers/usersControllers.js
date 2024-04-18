import UserModel from "../models/userModel.js";
import HttpError from "../utils/httpError.js";
import { signToken } from "../services/jwtService.js";
import catchAsync from "../utils/catchAsync.js";

export const createUser = catchAsync(async (req, res) => {
  const user = await UserModel.create(req.body);

  user.password = undefined;

  const token = signToken(user.id);

  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
    token,
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  user.password = undefined;

  const token = signToken(user.id);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      user: user.subscription,
    },
  });
});

export const logoutUser = catchAsync(async (req, res) => {
  const token = req.user;

  token.token = null;
  await token.save();

  res.setStatus(204);
});

export const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};
