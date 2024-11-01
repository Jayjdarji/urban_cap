import express from "express";
import AdminDashboardController from "../controllers/AdminDashboardController.js";
const router = express.Router();

router.get("/dashboard", AdminDashboardController.getDashboard);
router.get(
  "/services/:serviceKey",
  AdminDashboardController.getAllServiceByKey
);
router.get("/service/:serviceKey", AdminDashboardController.getService);
router.get("/all/services", AdminDashboardController.getAllServices);

router.get("/events/:eventKey", AdminDashboardController.getAllEventsByKey);
router.get("/event/:eventKey", AdminDashboardController.getEvent);

router.get("/event/toggle/:eventKey", AdminDashboardController.toggleEvent);
router.get(
  "/service/toggle/:serviceKey",
  AdminDashboardController.toggleService
);

export { router as adminDashboardRouter };
