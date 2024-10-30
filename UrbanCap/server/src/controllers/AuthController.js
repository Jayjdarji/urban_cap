import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { User } from "../models/Users.js";
import { sendEmailVerificationMail, sendMail } from "../utils/index.js";

const adminUser = {
  email: "admin@user.com",
  password: "Test@123",
  role: "admin",
};

const AuthController = {
  async signin(request, response) {
    try {
      const { email, password } = request.body;

      // Check if user exists
      const user = await User.findOne({ email });

      if (!user) {
        return response
          .status(404)
          .json({ message: "User not found", success: 0 });
      }

      // Compare password with hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return response
          .status(401)
          .json({ message: "Invalid password", success: 0 });
      }

      if (!user.isVerified) {
        return response.status(404).json({
          message: "User is not verified",
          success: 0,
          notVerified: true,
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET || "random",
        { expiresIn: "1h" }
      );

      return response.status(200).json({
        message: "Signin successful",
        success: 1,
        token,
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async adminSignin(request, response) {
    try {
      const { email, password } = request.body;

      if (email !== adminUser.email) {
        return response
          .status(404)
          .json({ message: "Invalid Credentials", success: 0 });
      }

      const isPasswordMatch = password === adminUser.password;

      if (!isPasswordMatch) {
        return response
          .status(401)
          .json({ message: "Invalid Credentials", success: 0 });
      }

      // Create JWT token
      const token = jwt.sign(
        { email: adminUser.email, role: adminUser.role },
        process.env.JWT_SECRET || "random",
        { expiresIn: "100h" }
      );

      return response.status(200).json({
        message: "Admin signin successful",
        success: 1,
        token,
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async register(request, response) {
    try {
      const user = request.body;

      // check if user already exist

      const isUserExist = await User.findOne({
        email: user.email,
      });

      if (!_.isEmpty(isUserExist)) {
        return response
          .status(409)
          .json({ message: "Email is already registered", success: 0 });
      }

      // Create User Object

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const insertedUser = new User({ ...user, password: hashedPassword });

      if (_.isEmpty(insertedUser)) {
        return response.status(500).json({
          message: "Something went wrong, User could not be saved",
          success: 0,
        });
      }

      // Save User

      await insertedUser.save();

      const emailToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || "random",
        { expiresIn: "5m" }
      );

      sendEmailVerificationMail(user.email, emailToken);

      return response.status(201).json({
        message:
          "We have sent an mail to your email address, Please verify your account",
        success: 1,
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async verify(request, response) {
    try {
      const token = request.query.token;

      const encryptedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || "random"
      );

      if (_.isEmpty(encryptedToken)) {
        return response
          .status(404)
          .json({ message: "Verification link is expired", success: 0 });
      }

      const user = await User.findOne({ email: encryptedToken.email });

      if (_.isEmpty(user)) {
        return response
          .status(404)
          .json({ message: "User not found", success: 0 });
      }

      if (user.isVerified) {
        return response
          .status(200)
          .json({ message: "User is already verified", success: 1 });
      }

      user.isVerified = true;
      user.save();

      return response
        .status(200)
        .json({ message: "User verified successfully", success: 1 });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async sendVerificationEmail(request, response) {
    try {
      const { email } = request.body;

      // check if user already exist

      const isUserExist = await User.findOne({
        email,
      });

      if (_.isEmpty(isUserExist)) {
        return response.status(404).json({
          message: "There is no user associated with this email",
          success: 0,
        });
      }

      const emailToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || "random",
        { expiresIn: "5m" }
      );

      sendEmailVerificationMail(email, emailToken);

      return response.status(200).json({
        message:
          "We have sent an mail to your email address, Please verify your account",
        success: 1,
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async resetPasswordEmail(request, response) {
    try {
      const { email } = request.body;

      const user = await User.findOne({ email });
      if (_.isEmpty(user)) {
        return response
          .status(404)
          .json({ message: "User not found", success: 0 });
      }

      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || "random",
        { expiresIn: "1h" }
      );

      const resetLink = `http://localhost:3000/reset-password/${token}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `Hello, please use the following link to reset your password: ${resetLink}. This link will expire in 1 hour.`,
      };

      sendMail(mailOptions);
      return response.status(200).json({
        message: "Password reset email sent successfully",
        success: 1,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },

  async resetPassword(request, response) {
    try {
      const { token, newPassword } = request.body;

      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET || "random"
      );

      if (_.isEmpty(decodedToken)) {
        return response
          .status(404)
          .json({ message: "Reset link is expired or invalid", success: 0 });
      }

      const user = await User.findOne({ email: decodedToken.email });
      if (_.isEmpty(user)) {
        return response
          .status(404)
          .json({ message: "User not found", success: 0 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user's password
      user.password = hashedPassword;
      await user.save();

      return response
        .status(200)
        .json({ message: "Password reset successful", success: 1 });
    } catch (error) {
      console.log("🚀🚀🚀 ~ resetPassword ~ error:", error);
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },
};

export default AuthController;
