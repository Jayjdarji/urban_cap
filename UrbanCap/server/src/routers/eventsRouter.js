import express from "express";
import EventController from "../controllers/EventsController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, EventController.createEvent);
router.get("/all", EventController.getAllEvents);

export { router as eventsRouter };
