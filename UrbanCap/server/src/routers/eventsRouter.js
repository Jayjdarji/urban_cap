import express from "express";
import EventController from "../controllers/EventsController.js";
const router = express.Router();

router.post("/", EventController.createEvent);
router.get("/all", EventController.getAllEvents);

export { router as eventsRouter };
