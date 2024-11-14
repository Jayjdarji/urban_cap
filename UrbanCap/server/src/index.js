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
import { eventsRouter } from "./routers/eventsRouter.js";
import httpServer from "http";
import configureSocket from "./config/socket.js";
import { User } from "./models/Users.js";
import jwt from "jsonwebtoken";

configDotenv();

const app = express();
const server = httpServer.createServer(app);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const io = configureSocket(server);

io.use((socket, next) => {
  const bearerToken = socket.handshake.headers.authorization;
  const token = bearerToken?.split(" ")[1];

  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log("🔊🔊🔊🔊🔊🔊 ~ jwt.verify ~ err:", err);
      return next(new Error("Authentication error: Invalid token"));
    }

    try {
      const user = await User.findOne({ _id: decoded.id });

      if (!user) {
        return;
      }

      user.socket = socket.id;
      await user.save();
      socket.user = decoded;

      next();
    } catch (error) {
      console.error("Error updating user socket:", error);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("send_notification", async (data) => {
    const { socket } = await User.findOne({ id: data.userId }, "-_id socket");

    io.emit("receive_notification", {
      data: {
        message: "Hello there",
      },
    });
  });
});

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

server.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.get("/api", (_, res) => {
  return res.status(200).json("hello");
});

app.use("/api/auth", authRouter);

app.use("/api/services", serviceRouter);
app.use("/api/events", eventsRouter);

app.use("/api/admin", adminAuthMiddleware, adminDashboardRouter);
