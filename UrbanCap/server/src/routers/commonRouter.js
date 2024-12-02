import express from "express";
import CommonController from "../controllers/CommonController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.get(
  "/bookings",
  authMiddleware,
  CommonController.getAllBookingsByUserId
);

router.post("/extraServices", authMiddleware, CommonController.addExtraService);
router.post(
  "/extraServices/cancel",
  authMiddleware,
  CommonController.cancelExtraService
);


export { router as commonRouter };
