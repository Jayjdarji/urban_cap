import express from "express";
import AdminDashboardController from "../controllers/AdminDashboardController.js";
const router = express.Router();

router.get("/dashboard", AdminDashboardController.getDashboard);
router.get(
  "/services/:serviceKey",
  AdminDashboardController.getAllServiceByKey
);
router.get("/:serviceKey", AdminDashboardController.getService);

export { router as adminDashboardRouter };
