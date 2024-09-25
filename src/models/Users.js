import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already register"],
    },
    password: {
      type: String,
      minLength: [6, "Password should be atleast 6 characters long"],
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: {
        values: ["ADMIN", "SERVICE_PROVIDER", "CUSTOMER"],
        message: "User type is not valid",
      },
      default: "CUSTOMER",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
