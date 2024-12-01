import { EventDetails } from "../models/EventDetails.js";
import { ServiceDetails } from "../models/ServiceDetails.js";
import { User } from "../models/Users.js";
import { Services } from "../models/Services.js";
import { Event } from "../models/Event.js";
import {
  sendBookingAcceptedMail,
  sendBookingRejectedMail,
} from "../utils/index.js";

const AdminDashboardController = {
  getDashboard: async (req, res) => {
    try {
      const extraPayload = {};
      let payload = {};

      if (req.user.userType === "SERVICE_PROVIDER") {
        extraPayload.providers = { $in: [req.user._id] };
        payload = { providerId: req.user._id };
      }

      const totalUsers = await User.countDocuments().where({
        userType: "CUSTOMER",
      });
      const totalProviders = await User.countDocuments().where({
        userType: "SERVICE_PROVIDER",
      });
      const servicesBooked = await ServiceDetails.countDocuments().where({
        ...payload,
      });
      const eventsBooked = await EventDetails.countDocuments().where({
        ...payload,
      });

      const furnitureAssemblies = await ServiceDetails.countDocuments().where({
        serviceKey: "furnitureAssembly",
        ...payload,
      });

      const miniGolfCount = await EventDetails.countDocuments().where({
        eventType: "miniGolfRoundRobin",
        ...payload,
      });

      const videoGamesCount = await EventDetails.countDocuments().where({
        eventType: "videoGamesRoundRobin",
        ...payload,
      });

      const rockClimbingCount = await EventDetails.countDocuments().where({
        eventType: "indoorRockClimbing",
        ...payload,
      });

      res.status(200).json({
        users: req.user.userType === "SERVICE_PROVIDER" ? null : totalUsers,
        servicesBooked: servicesBooked,
        events: eventsBooked,
        furnitureAssembly: furnitureAssemblies,
        miniGolfCount,
        videoGamesCount,
        rockClimbingCount,
        providers:
          req.user.userType === "SERVICE_PROVIDER" ? null : totalProviders,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get dashboard data",
        error: error.message,
      });
    }
  },

  getAllServiceByKey: async (req, res) => {
    try {
      const serviceKey = req.params.serviceKey;
      const services = await ServiceDetails.find({ serviceKey });
      if (!services) {
        res.status(404).json({
          message: "Service not found",
        });
      } else {
        res.status(200).json({
          message: "Service found",
          services,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to get service",
        error: error.message,
      });
    }
  },

  getService: async (req, res) => {
    try {
      const serviceKey = req.params.serviceKey;
      const service = await Services.findOne({ serviceName: serviceKey });
      if (!service) {
        res.status(404).json({
          message: "Service not found",
        });
      } else {
        res.status(200).json({
          message: "Service found",
          service,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to get service",
        error: error.message,
      });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const extraPayload = {};

      if (req.user.userType === "SERVICE_PROVIDER") {
        extraPayload.providers = { $in: [req.user._id] };
      }

      const services = await Services.find({ ...extraPayload });

      if (!services) {
        res.status(404).json({
          message: "Services not found",
        });
      } else {
        res.status(200).json({
          message: "Services found",
          services,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to get services",
        error: error.message,
      });
    }
  },

  getAllEventsByKey: async (req, res) => {
    try {
      const extraPayload = {};

      if (req.user.userType === "SERVICE_PROVIDER") {
        extraPayload.providerId = req.user._id;
      }

      const eventKey = req.params.eventKey;
      const events = await EventDetails.find({
        eventType: eventKey,
        ...extraPayload,
      }).populate({ path: "userId", select: "name email" });

      if (!events) {
        res.status(404).json({
          message: "Events not found",
        });
      } else {
        res.status(200).json({
          message: "Events found",
          events,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to get events",
        error: error.message,
      });
    }
  },

  getEvent: async (req, res) => {
    try {
      const eventKey = req.params.eventKey;
      const event = await Event.findOne({ eventName: eventKey });
      if (!event) {
        res.status(404).json({
          message: "Event not found",
        });
      } else {
        res.status(200).json({
          message: "Event found",
          event,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to get event",
        error: error.message,
      });
    }
  },

  toggleEvent: async (req, res) => {
    try {
      const { eventKey } = req.params;
      const event = await Event.findOne({ eventName: eventKey });
      if (event) {
        event.active = !event.active;
        await event.save();
        res.status(200).json({
          message: "Event toggled successfully",
          event,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to toggle event",
        error: error.message,
      });
    }
  },

  toggleService: async (req, res) => {
    try {
      const { serviceKey } = req.params;
      const service = await Services.findOne({ serviceName: serviceKey });
      if (service) {
        service.active = !service.active;
        await service.save();
        res.status(200).json({
          message: "Service toggled successfully",
          service,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to toggle service",
        error: error.message,
      });
    }
  },

  acceptEvent: async (req, res) => {
    try {
      const { id } = req.body;
      const eventDetails = await EventDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });

      if (eventDetails) {
        eventDetails.active = "Accepted";
        sendBookingAcceptedMail(eventDetails.userId.email, id);
        await eventDetails.save();
        return res.status(200).json({
          message: "Event booking accepted successfully",
          event: eventDetails,
        });
      }
      return res.status(400).json({
        message: "Event booking not found",
        error: error.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to accept Event Booking",
        error: error.message,
      });
    }
  },

  rejectEvent: async (req, res) => {
    try {
      const { id } = req.body;
      const eventDetails = await EventDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });
      if (eventDetails) {
        eventDetails.active = "Rejected";
        sendBookingRejectedMail(eventDetails.userId.email, id);
        await eventDetails.save();
        return res.status(200).json({
          message: "Event booking rejected successfully",
          eventDetails,
        });
      }
      return res.status(400).json({
        message: "Event booking not found",
        error: error.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to reject Event Booking",
        error: error.message,
      });
    }
  },

  acceptService: async (req, res) => {
    try {
      const { id } = req.body;
      const serviceDetails = await ServiceDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });

      if (serviceDetails) {
        serviceDetails.active = "Accepted";
        sendBookingAcceptedMail(serviceDetails.userId.email, id);
        await serviceDetails.save();
        return res.status(200).json({
          message: "Service booking accepted successfully",
          service: serviceDetails,
        });
      }
      return res.status(400).json({
        message: "Service booking not found",
        error: error.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to accept Service Booking",
        error: error.message,
      });
    }
  },

  rejectService: async (req, res) => {
    try {
      const { id } = req.body;
      const serviceDetails = await ServiceDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });
      if (serviceDetails) {
        serviceDetails.active = "Rejected";
        sendBookingRejectedMail(serviceDetails.userId.email, id);
        await serviceDetails.save();
        return res.status(200).json({
          message: "Service booking rejected successfully",
          serviceDetails,
        });
      }
      return res.status(400).json({
        message: "Service booking not found",
        error: error.message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to reject Service Booking",
        error: error.message,
      });
    }
  },

  getUsersByType: async (req, res) => {
    try {
      const { type } = req.params;
      const users = await User.find({ userType: type });
      if (!users) {
        res.status(404).json({
          message: "Users not found",
        });
      } else {
        res.status(200).json({
          message: "Users found",
          users,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  },
};

export default AdminDashboardController;
