import { configDotenv } from "dotenv";
import db from "./config/db.js";
import { authRouter } from "./routers/authRouter.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { serviceRouter } from "./routers/serviceRouter.js";
import {
  adminAuthMiddleware,
  authMiddleware,
} from "./middleware/AuthMiddleware.js";
import { adminDashboardRouter } from "./routers/adminDashboard.js";
const app = express();

configDotenv();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT;

// Database

db.on("error", () => {
  console.error("Failed to connect to database");
});

// Database

db.on("open", () => {
  console.error("Connected to database successfully");
});

db.on("error", (error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.get("/api", (_, res) => {
  return res.status(200).json("hello");
});

app.use("/api/auth", authRouter);

app.use("/api/services", authMiddleware, serviceRouter);

app.use("/api/admin", adminAuthMiddleware, adminDashboardRouter);
