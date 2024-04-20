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

export default usersRouter;
