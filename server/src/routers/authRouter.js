import express from "express";
import AuthController from "../controllers/AuthController.js";
import {
  registerValidator,
  signInValidator,
} from "../validators/AuthValidator.js";
const router = express.Router({});

router.post("/signin", signInValidator, AuthController.signin);
router.post("/signup", registerValidator, AuthController.register);
router.get("/verify", AuthController.verify);
router.post("/verify-email", AuthController.sendVerificationEmail);
router.post("/email-reset-password", AuthController.resetPasswordEmail);
router.put("/reset-password", AuthController.resetPassword);

export { router as authRouter };
