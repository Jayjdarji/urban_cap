import nodemailer from "nodemailer";

const user = process.env.NODE_MAILER_USER;
const pass = process.env.NODE_MAILER_PASS;

const nodeMailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export default nodeMailer;
