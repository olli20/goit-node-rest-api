import UserModel from "../models/userModel.js";
import HttpError from "../utils/httpError.js";
import { signToken } from "../services/jwtService.js";
import catchAsync from "../utils/catchAsync.js";

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
