import dotenv from "dotenv";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";

dotenv.config();

const events = [
  {
    eventName: "miniGolfRoundRobin",
    label: "Mini Golf Round Robin",
    active: true,
  },
  {
    eventName: "videoGamesRoundRobin",
    label: "Video Games Round Robin",
    active: true,
  },
  {
    eventName: "indoorRockClimbing",
    label: "Indoor Rock Climbing",
    active: true,
  },
  {
    eventName: "teamBuilding",
    label: "Team Building",
    active: true,
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Event.deleteMany({});

    await Event.insertMany(events);
    console.log("Event seeded successfully!");
  } catch (error) {
    console.error("Error seeding event:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedEvents();
