import _ from "lodash";
import nodeMailer from "../config/nodemailer.js";

export const sendMail = (receiver, subject, data) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: receiver,
    subject,
    text: data,
    html: `<h1>Hi there!!</h1><p>${data}</p>`,
  };

  nodeMailer.sendMail(mailOptions, (error) => {
    if (!_.isEmpty(error)) {
      console.error("Could not send email");
      throw error;
    }
    console.log("Email sent!!");
  });
};
