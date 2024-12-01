import { EventDetails } from "../models/EventDetails.js";
import { Event } from "../models/Event.js";
import { PastBooking } from "../models/PastBooking.js";
import { User } from "../models/Users.js";
import { stat } from "fs";

const EventController = {
  createEvent: async (req, res) => {
    try {
      const {
        eventType,
        numberOfPersons,
        date,
        additionalRequests,
        providerId,
      } = req.body;

      const user = req.user;

      const payload = {};

      if (providerId) {
        payload.providerId = providerId;
      }

      const newEvent = new EventDetails({
        eventType,
        numberOfPersons,
        date,
        userId: user.id,
        additionalRequests,
        ...payload,
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

  getProviders: async (req, res) => {
    try {
      const eventKey = req.params.eventKey;

      const users = await User.find({
        events: { $in: [eventKey] },
      });

      return res.status(200).json({
        message: "Providers fetched successfully",
        providers: users,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch providers",
        error: error.message,
      });
    }
  },

  cancelEvent: async (req, res) => {
    try {
      const { id } = req.body;
      const eventDetails = await EventDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });

      if (eventDetails) {
        eventDetails.active = "Cancelled";
        await eventDetails.save();
        return res.status(200).json({
          message: "Event booking cancelled successfully",
          eventDetails,
        });
      }
      return res.status(400).json({
        message: "Event booking not found",
        status: 400,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to cancel Event Booking",
        error: error.message,
      });
    }
  },
};

export default EventController;
