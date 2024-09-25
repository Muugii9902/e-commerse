import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth-Route";
import { connectDB } from "./config/db";
import nodemailer from "nodemailer";

dotenv.config();
import { genarateHtmlTemplate } from "./utils/generate";
import { Resend } from "resend";
// express
const app = express();
const resend = new Resend(process.env.RESEND_API_KEYS);

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);

app.get("/", async (req: Request, res: Response) => {
  // const rndOtp = Math.floor(Math.random() * 10_000)
  //   .toString()
  //   .padStart(4, "0");
  // sendEmail("muugii9902@gmail.com", rndOtp);

  res.send("Welcome E-Commerce API Server");
});

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: true, // true for port 465, false for other ports
//   auth: {
//     user: "muugii9902@gmail.com",
//     pass: "zzgroacukvehqjzq",
//   },
// });
// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: "muugii9902@gmail.com", // sender address
//     to: "ugtakhbayar0217@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }
// main();

connectDB(MONGO_URI);
//server
app.listen(PORT, () => {
  console.log(`server localhost:${PORT}deer aslaa??`);
});
