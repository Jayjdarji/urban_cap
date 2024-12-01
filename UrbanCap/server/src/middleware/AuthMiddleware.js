import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided.", success: 0 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random");

    const user = await User.findOne({
      _id: decoded.id,
      isDeleted: false,
      isSuspended: false,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found.", success: 0 });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token.", success: 0 });
  }
};

export const adminAuthMiddleware = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.status(403).json({
        message: "Access denied. No token provided.",
        success: 0,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random");

    if (decoded.role !== "ADMIN" && decoded.role !== "SERVICE_PROVIDER") {
      return response.status(403).json({
        message: "Access denied. Admins only.",
        success: 0,
      });
    }

    if (decoded.role === "SERVICE_PROVIDER") {
      const user = await User.findOne({
        email: decoded.email,
        isDeleted: false,
        isSuspended: false,
      });
      if (!user) {
        return response.status(404).json({
          message: "User not found.",
          success: 0,
        });
      }
      request.user = user;
    } else request.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      message: "Invalid token.",
      success: 0,
    });
  }
};