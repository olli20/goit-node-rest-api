import express from "express";
import {
  checkRegisterData,
  checkLoginData,
} from "../middlewares/usersMiddlewares.js";
import { createUser, loginUser } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", checkRegisterData, createUser);
usersRouter.post("/login", checkLoginData, loginUser);
// usersRouter.post("./logout");

export default usersRouter;
