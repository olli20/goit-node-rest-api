import express from "express";
import controllers from "../controllers/contactsControllers.js";
import validateBody from "../utils/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

import { checkContactMiddleware } from "../contactsMiddlewares/contactsMiddlewares.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = controllers;

const contactsRouter = express.Router();

contactsRouter
  .route("/")
  .get(getAllContacts)
  .post(validateBody(createContactSchema), createContact);

contactsRouter.use("/:id", checkContactMiddleware);
contactsRouter
  .route("/:id")
  .get(getOneContact)
  .put(validateBody(updateContactSchema), updateContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusSchema),
  updateStatusContact
);

export default contactsRouter;
