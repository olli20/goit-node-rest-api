import express from "express";
import {
  checkRegisterData,
  checkLoginData,
  checkLogoutData,
} from "../middlewares/usersMiddlewares.js";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", checkRegisterData, createUser);
usersRouter.post("/login", checkLoginData, loginUser);
usersRouter.post("./logout", checkLogoutData, logoutUser);

export default usersRouter;
