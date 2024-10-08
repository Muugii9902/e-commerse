import nodemailer from "nodemailer";
import { genarateHtmlTemplate } from "./generate";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  secure: true,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: "muugii9902@gmail.com",
    to: email,
    subject: "Hello World",
    html: genarateHtmlTemplate(otp),
  });
};
