import express from "express";
import ServiceController from "../controllers/ServiceController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, ServiceController.createService);
router.get("/all", ServiceController.getAllServices);
router.get(
  "/all/bookings",
  authMiddleware,
  ServiceController.getAllBookingsByUserId
);

export { router as serviceRouter };
