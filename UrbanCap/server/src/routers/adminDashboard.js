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

router.post("/event/accept", AdminDashboardController.acceptEvent);
router.post("/event/reject", AdminDashboardController.rejectEvent);
router.post("/service/accept", AdminDashboardController.acceptService);
router.post("/service/reject", AdminDashboardController.rejectService);
router.post(
  "/extraServices/accept",
  AdminDashboardController.acceptExtraService
);
router.post(
  "/extraServices/reject",
  AdminDashboardController.rejectExtraService
);
router.get("/users/:type", AdminDashboardController.getUsersByType);

// Providers
router.post("/provider/addUpdate", AdminDashboardController.addUpdateEvents);

//Users
router.post("/user/delete", AdminDashboardController.deleteUser);
router.post("/user/suspend", AdminDashboardController.suspendUser);
router.get("/extraServices", AdminDashboardController.getAllExtraServices);

export { router as adminDashboardRouter };
