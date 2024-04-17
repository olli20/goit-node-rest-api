import UserModel from "../models/userModel.js";

export const checkUserExistsService = (filter) => UserModel.exists(filter);

export const getUserByIdService = (id) => UserModel.findById(id);
