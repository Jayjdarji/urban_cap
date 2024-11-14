import mongoose from "mongoose";
const pastBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "EventDetails",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ServiceDetails",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PastBooking = mongoose.model("PastBooking", pastBookingSchema);
