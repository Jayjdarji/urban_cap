import express from "express";
import AuthController from "../controllers/AuthController.js";
import { registerValidator } from "../validators/AuthValidator.js";
const router = express.Router({});

router.post("/signup", registerValidator, AuthController.register);

export { router as authRouter };
