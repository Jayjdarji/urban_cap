import mongoose from "mongoose";
const event = new mongoose.Schema(
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

export const Event = mongoose.model("Event", event);
