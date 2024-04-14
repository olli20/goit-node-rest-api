import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import globalErrorHandler from "./controllers/errorController.js";
import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

// handle not found error
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// handle global error
app.use(globalErrorHandler);

//SERVER
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
