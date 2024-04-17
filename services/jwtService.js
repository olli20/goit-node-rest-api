import jwt from "jsonwebtoken";
import HttpError from "../utils/httpError.js";

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const checkToken = (token) => {
  if (!token)
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    return id;
  } catch (error) {
    throw new HttpError(401, "Unauthorized", { message: "Not authorized" });
  }
};
