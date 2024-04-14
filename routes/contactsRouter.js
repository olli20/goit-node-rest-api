import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../utils/contactValidators.js";

import { checkContactMiddleware } from "../middlewares/contactsMiddlewares.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(createContactSchema, createContact);

contactsRouter.use("/:id", checkContactMiddleware);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .delete(deleteContact)
  .put(updateContactSchema, updateContact);

contactsRouter.patch("/:id/favorite", updateStatusSchema, updateStatusContact);

export default contactsRouter;
