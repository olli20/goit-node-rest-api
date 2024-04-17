import express from "express";
import {
  checkRegisterData,
  checkLoginData,
  checkLogoutData,
  protect,
} from "../middlewares/usersMiddlewares.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.get("/current", protect, getCurrentUser);
usersRouter.post("/register", checkRegisterData, createUser);
usersRouter.post("/login", checkLoginData, loginUser);
usersRouter.post("/logout", checkLogoutData, logoutUser);

export default usersRouter;
