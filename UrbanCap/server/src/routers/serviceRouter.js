import express from "express";
import ServiceController from "../controllers/ServiceController.js";
const router = express.Router();

router.post("/", ServiceController.createService);

export { router as serviceRouter };
