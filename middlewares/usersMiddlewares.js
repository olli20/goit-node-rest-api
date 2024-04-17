import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/httpError.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../services/userService.js";
import {
  loginUserDataValidator,
  registerUserDataValidator,
} from "../utils/userValidators.js";
import { checkToken } from "../services/jwtService.js";

export const checkRegisterData = catchAsync(async (req, res, next) => {
  const { value, errors } = registerUserDataValidator(req.body);

  if (errors) {
    throw new HttpError(400, "Bad Request", {
      message: "Помилка від Joi або іншої бібліотеки валідації",
    });
  }

  const userExists = await checkUserExistsService({ email: value.email });

  if (userExists) {
    throw new HttpError(409, "Conflict", {
      message: "Email in use",
    });
  }

  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, errors } = loginUserDataValidator(req.body);

  if (errors)
    throw new HttpError(400, "Bad Request", {
      message: "Помилка від Joi або іншої бібліотеки валідації",
    });

  req.body = value;

  next();
};

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];
  const userId = checkToken(token);

  if (!userId)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  const currentUser = await getUserByIdService(userId);

  if (!currentUser)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  req.user = currentUser;

  next();
});

export const checkLogoutData = (req, res, next) => {};
