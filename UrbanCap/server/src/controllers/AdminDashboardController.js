import { Event } from "../models/Event.js";
import { ServiceDetails } from "../models/Service.js";
import { User } from "../models/Users.js";
import { Services } from "../models/Services.js";

const AdminDashboardController = {
  getDashboard: async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const servicesBooked = await ServiceDetails.countDocuments().where();
      const eventsBooked = await Event.countDocuments().where({
        numberOfPersons: {
          $gte: 2,
        },
      });

      const furnitureAssemblies = await ServiceDetails.countDocuments().where({
        serviceKey: "furnitureAssembly",
      });

      const miniGolfCount = await Event.countDocuments().where({
        eventType: "miniGolfRoundRobin",
        numberOfPersons: {
          $gte: 2,
        },
      });

      const videoGamesCount = await Event.countDocuments().where({
        eventType: "videoGamesRoundRobin",
        numberOfPersons: {
          $gte: 2,
        },
      });

      const rockClimbingCount = await Event.countDocuments().where({
        eventType: "indoorRockClimbing",
        numberOfPersons: {
          $gte: 2,
        },
      });

      res.status(200).json({
        users: totalUsers,
        servicesBooked: servicesBooked,
        events: eventsBooked,
        furnitureAssembly: furnitureAssemblies,
        miniGolfCount,
        videoGamesCount,
        rockClimbingCount,
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
      const services = await Services.find();
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
};

export default AdminDashboardController;
