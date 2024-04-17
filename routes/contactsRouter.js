import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactDataValidator,
  updateContactDataValidator,
  updateStatusDataValidator,
} from "../utils/contactValidators.js";

import { checkContactMiddleware } from "../middlewares/contactsMiddlewares.js";
import { protect } from "../middlewares/usersMiddlewares.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.use("/", protect);
contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(createContactDataValidator, createContact);

contactsRouter.use("/:id", checkContactMiddleware);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContactDataValidator, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  updateStatusDataValidator,
  updateStatusContact
);

export default contactsRouter;
