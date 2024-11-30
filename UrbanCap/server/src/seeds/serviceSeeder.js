import dotenv from "dotenv";
import mongoose from "mongoose";
import { Services } from "../models/Services.js";

dotenv.config();

const services = [
  {
    serviceName: "furnitureAssembly",
    label: "Furniture Assembly",
    active: true,
  },
  {
    serviceName: "homeCleaning",
    label: "Home Cleaning",
    active: true,
  },
];

const seedServices = async () => {
  try {
    // Connect to MongoDB using the connection string from .env
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing services in the collection
    await Services.deleteMany({});

    // Insert the new service
    await Services.insertMany(services);
    console.log("Services seeded successfully!");
  } catch (error) {
    console.error("Error seeding service:", error);
  } finally {
    await mongoose.disconnect();
  }
};

// Execute the seeder function
seedServices();
