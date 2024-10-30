import { Service } from "../models/Service.js";
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
      } = req.body;

      const newService = new Service({
        serviceKey,
        location,
        date,
        time,
        serviceData,
        totalAmount,
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
};

export default ServiceController;
