import _ from "lodash";
import nodeMailer from "../config/nodemailer.js";
import fs from "fs";

export const sendMail = (mailOptions) => {
  nodeMailer.sendMail(mailOptions, (error) => {
    if (!_.isEmpty(error)) {
      console.error("Could not send email");
      throw error;
    }
    console.log("Email sent!!");
  });
};

export const sendEmailVerificationMail = (receiver, data) => {
  try {
    const emailTemplate = fs.readFileSync(
      "src/utils/verificationEmail.html",
      "utf-8"
    );

    const htmlContent = emailTemplate.replace(
      "{{verificationLink}}",
      `http://localhost:3000/verification/${data}`
    );

    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: receiver,
      subject: "Please confirm you email address",
      html: htmlContent,
    };

    sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export const sendBookingAcceptedMail = (receiver, data) => {
  try {
    const emailTemplate = fs.readFileSync("src/utils/Accepted.html", "utf-8");

    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: receiver,
      subject: "Booking Accepted",
      html: emailTemplate,
    };

    sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export const sendBookingRejectedMail = (receiver, data) => {
  try {
    const emailTemplate = fs.readFileSync("src/utils/Rejected.html", "utf-8");

    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: receiver,
      subject: "Booking Rejected",
      html: emailTemplate,
    };

    sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

