import { ServiceDetails } from "../models/Service.js";
import { Services } from "../models/Services.js";

const ServiceController = {
  createService: async (req, res) => {
    try {
      const {
        serviceKey,
        location,
        date,
        time,
        serviceData,
        totalAmount,
        orderSummary,
        currency,
      } = req.body;

      const newService = new ServiceDetails({
        serviceKey,
        location,
        date,
        time,
        serviceData,
        totalAmount,
        currency,
        orderSummary,
      });

      // Save to database
      const savedService = await newService.save();

      // Return the saved document
      res.status(201).json({
        message: "Service booked successfully",
        service: savedService,
      });
    } catch (error) {
      res.status(400).json({
        message: "Failed to book service",
        error: error.message,
      });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await Services.find({ active: true });
      res.status(200).json({
        message: "All services fetched successfully",
        services,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch all services",
        error: error.message,
      });
    }
  },
};

export default ServiceController;
