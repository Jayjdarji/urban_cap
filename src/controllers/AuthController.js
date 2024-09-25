import { User } from "../models/Users.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import { sendMail } from "../utils/index.js";
import jwt from "jsonwebtoken";

const AuthController = {
  async register(request, response) {
    try {
      const user = request.body;
      //console.log({ user })
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
        user.email,
        process.env.JWT_SECRET || "random"
      );

      sendMail(user.email, "Verify user", emailToken);

      return response.status(201).json({
        message:
          "We have sent an mail to your email address, Please verify your account",
        success: 1,
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
        success: 0,
      });
    }
  },
};

export default AuthController;
