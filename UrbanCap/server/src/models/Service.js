import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceKey: {
      type: String,
      required: [true, "Service key is required"],
    },
    location: {
      state: {
        type: String,
        required: [true, "State is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    serviceData: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Service data is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    orderSummary: {
      date: {
        type: String,
        required: [true, "Order date is required"],
      },
      time: {
        type: String,
        required: [true, "Order time is required"],
      },
      location: {
        type: String,
        required: [true, "Order location is required"],
      },
      total: {
        type: Number,
        required: [true, "Order total is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Service = mongoose.model("Service", serviceSchema);
