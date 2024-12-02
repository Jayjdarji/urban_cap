import { ExtraService } from "../models/ExtraService.js";
import { PastBooking } from "../models/PastBooking.js";

const CommonController = {
  getAllBookingsByUserId: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookings = await PastBooking.find({ userId }).populate([
        "event",
        "service",
        "extraService",
      ]);
      res.status(200).json({
        message: "All bookings fetched successfully",
        bookings,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch all bookings",
        error: error.message,
      });
    }
  },

  addExtraService: async (req, res) => {
    try {
      const { title, date, province, city, time } = req.body;
      const user = req.user;
      const extraService = new ExtraService({
        title,
        date,
        province,
        city,
        time,
        userId: user._id,
      });

      const dbEService = await extraService.save();

      await PastBooking.create({
        extraService: dbEService._id,
        startDate: date,
        userId: user._id,
      });

      res.status(201).json({
        message:
          "Your request for extra has been registered, We will notify you in sometime!!",
        extraService,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to register extra service",
        error: error.message,
      });
    }
  },

  cancelExtraService: async (req, res) => {
    try {
      const { id } = req.body;
      const extraService = await ExtraService.findById(id).populate({
        path: "userId",
        ref: "User",
      });

      if (extraService) {
        extraService.active = "Cancelled";
        await extraService.save();
        return res.status(200).json({
          message: "Extra Service booking cancelled successfully",
          extraService,
        });
      }
      return res.status(400).json({
        message: "Extra Service booking not found",
        status: 400,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to cancel Extra Service Booking",
        error: error.message,
      });
    }
  },
};

export default CommonController;
