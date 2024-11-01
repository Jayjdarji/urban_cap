import express from "express";
import ServiceController from "../controllers/ServiceController.js";
const router = express.Router();

router.post("/", ServiceController.createService);
router.get("/all", ServiceController.getAllServices);

export { router as serviceRouter };
