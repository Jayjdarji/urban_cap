// models/Service.js
import mongoose from "mongoose";

const event = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const Event = mongoose.model("Event", event);
