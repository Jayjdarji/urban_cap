import { PastBooking } from "../models/PastBooking.js";
import { ServiceDetails } from "../models/ServiceDetails.js";
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
        userId: req.user.id,
      });

      // Save to database
      const savedService = await newService.save();

      if (!savedService) {
        return res.status(400).json({
          message: "Failed to book a service",
          error: "Service not created",
        });
      }

      await PastBooking.create({
        userId: req.user.id,
        startDate: date,
        service: savedService._id,
      });

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

  cancelService: async (req, res) => {
    try {
      const { id } = req.body;
      const serviceDetails = await ServiceDetails.findById(id).populate({
        path: "userId",
        ref: "User",
      });

      if (serviceDetails) {
        serviceDetails.active = "Cancelled";
        await serviceDetails.save();
        return res.status(200).json({
          message: "Service booking cancelled successfully",
          serviceDetails,
        });
      }
      return res.status(400).json({
        message: "Service booking not found",
        status: 400,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to cancel Service Booking",
        error: error.message,
      });
    }
  },
};

export default ServiceController;
