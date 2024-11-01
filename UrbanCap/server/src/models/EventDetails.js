import mongoose from "mongoose";
const eventDetails = new mongoose.Schema(
  {
    eventType: {
      type: String,
      required: true,
      enum: [
        "miniGolfRoundRobin",
        "videoGamesRoundRobin",
        "indoorRockClimbing",
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    numberOfPersons: {
      type: Number,
      required: true,
      min: [1, "At least one person is required"],
    },
    date: {
      type: Date,
      required: true,
    },
    additionalRequests: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const EventDetails = mongoose.model("EventDetails", eventDetails);
