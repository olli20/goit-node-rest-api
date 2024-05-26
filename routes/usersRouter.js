import express from "express";
import {
  checkRegisterData,
  protect,
  uploadAvatar,
} from "../middlewares/usersMiddlewares.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  verificationToken,
  verifyUser,
} from "../controllers/usersControllers.js";

import {
  registerUserDataValidator,
  loginUserDataValidator,
} from "../utils/userValidators.js";

const usersRouter = express.Router();

usersRouter.get("/current", protect, getCurrentUser);
usersRouter.post(
  "/register",
  registerUserDataValidator,
  checkRegisterData,
  createUser
);
usersRouter.post("/login", loginUserDataValidator, loginUser);
usersRouter.post("/logout", protect, logoutUser);

usersRouter.patch("/avatars", protect, uploadAvatar, updateAvatar);

usersRouter.get("/verify/:verificationToken", verificationToken);
usersRouter.post("/verify", verifyUser);

export default usersRouter;
