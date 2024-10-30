import dotenv from "dotenv";
import mongoose from "mongoose";
import { Event } from "../models/Event.js";

dotenv.config();

const events = [
  {
    eventType: "miniGolfRoundRobin",
    numberOfPersons: 2,
    date: new Date(),
    additionalRequests: "None",
  },
  {
    eventType: "videoGamesRoundRobin",
    numberOfPersons: 2,
    date: new Date(),
    additionalRequests: "None",
  },
  {
    eventType: "indoorRockClimbing",
    numberOfPersons: 2,
    date: new Date(),
    additionalRequests: "None",
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
