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
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "EventDetails",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ServiceDetails",
    },
    extraService: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "ExtraService",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PastBooking = mongoose.model("PastBooking", pastBookingSchema);
