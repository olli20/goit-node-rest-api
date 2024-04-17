import UserModel from "../models/userModel.js";

export const checkUserExistsService = (filter) => UserModel.exists(filter);
