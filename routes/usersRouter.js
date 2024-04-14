import express from "express";
// import usersControllers from "../controllers/usersControllers.js";
// import usersMiddlewares from "../middlewares/usersMiddlewares.js";

const usersRouter = express.Router();

usersRouter.post(
  "./register"
  // usersMiddlewares.checkRegisterData,
  // usersControllers.register
);
// usersRouter.post("./login", usersControllers.login);
// usersRouter.post("./logout", usersControllers.logout);

export default usersRouter;
