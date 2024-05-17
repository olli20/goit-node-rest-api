import express from "express";
import { checkRegisterData, protect } from "../middlewares/usersMiddlewares.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
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

export default usersRouter;
