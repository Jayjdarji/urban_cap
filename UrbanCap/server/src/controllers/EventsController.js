import { EventDetails } from "../models/EventDetails.js";
import { Event } from "../models/Event.js";
import { PastBooking } from "../models/PastBooking.js";

const EventController = {
  createEvent: async (req, res) => {
    try {
      const { eventType, numberOfPersons, date, additionalRequests } = req.body;

      const user = req.user;

      const newEvent = new EventDetails({
        eventType,
        numberOfPersons,
        date,
        userId: user.id,
        additionalRequests,
      });

      const savedEvent = await newEvent.save();

      if (!savedEvent) {
        return res.status(400).json({
          message: "Failed to book an event",
          error: "Event not created",
        });
      }

      await PastBooking.create({
        userId: user.id,
        startDate: date,
        eventId: savedEvent._id,
      });

      res.status(201).json({
        message: "Event Quote requested successfully",
        event: savedEvent,
      });
    } catch (error) {
      console.log("🔊🔊🔊🔊🔊🔊 ~ createEvent: ~ error:", error);
      res.status(400).json({
        message: "Failed to request a quote",
        error: error.message,
      });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find({ active: true });
      res.status(200).json({
        message: "All events fetched successfully",
        events,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch all events",
        error: error.message,
      });
    }
  },
};

export default EventController;
