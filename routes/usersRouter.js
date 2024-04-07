import express from "express";
import authControllers from "../controllers/usersControllers.js";
import authMiddlewares from "../middlewares/usersMiddlewares.js";

const usersRouter = express.Router();

usersRouter.post(
  "./register",
  authMiddlewares.checkRegisterUserData,
  authControllers.register
);
usersRouter.post("./login", authControllers.login);
usersRouter.post("./logout", authControllers.logout);

export default usersRouter;
