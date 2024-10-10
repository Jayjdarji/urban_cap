import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const DB_URL = process.env.CONNECTION_STRING;

if (!DB_URL) {
  throw new Error(
    "Database connection string is not defined in environment variables"
  );
}

mongoose.connect(DB_URL);

const db = mongoose.connection;

export default db;
