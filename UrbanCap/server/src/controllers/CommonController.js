const CommonController = {
  getAllBookingsByUserId: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookings = await PastBooking.find({ userId }).populate([
        "eventId",
        "serviceId",
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
};

export default CommonController;
