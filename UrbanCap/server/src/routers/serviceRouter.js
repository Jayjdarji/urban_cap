import express from "express";
import ServiceController from "../controllers/ServiceController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, ServiceController.createService);

export { router as serviceRouter };
