import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt";
import { sendEmail } from "../utils/send-email";
import crypto from "crypto";
import { generateOtp } from "../utils/generateotp";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(402)
        .json({ message: "Нэр эсвэл нууц үг хоосон байж болохгүй." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "burtgel uusgegui bnaa" });
    }

    const isCheck = bcrypt.compareSync(password, user.password);
    console.log("first", isCheck);
    if (!isCheck) {
      return res.status(403).json({
        message: "Хэрэглэгчийн имэйл эсвэл нууц үг тохирохгүй байна.",
      });
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({ message: "success", token });
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа", error });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй." });
    }
    const createdUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      phoneNumber: "9922",
    });
    res.status(201).json({ message: "sucsess", user: createdUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error });
  }
};

export const currentUser = async (req: Request, res: Response) => {
  const { id } = req.user;
  const findUser = await User.findById(id);
  res.status(200).json({ user: findUser, message: "Success" });
};

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    console.log(findUser);
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Бүртгэлтэй хэрэглэгч олдсонгүй" });
    }
    const otp = generateOtp();
    console.log("otp", otp);
    findUser.otp = otp;
    await findUser.save();
    await sendEmail(email, otp);
    res.status(200).json({ message: "OTP code is sent email successfully" });
  } catch (error) {
    console.error("Алдаа гарлаа: ", error);
    res.status(500).json({ message: "Серверийн алдаа гарлааaa" });
  }
};
//
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otpValue } = req.body;
  const findUser = await User.findOne({ email: email, otp: otpValue });
  if (!findUser) {
    return res
      .status(400)
      .json({ message: "Бүртгэлтэй хэрэглэгч эсвэл OTP код олдсонгүй" });
  }
  const resetToken = crypto.randomBytes(25).toString("hex");
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  findUser.passwordResetToken = hashedResetToken;
  findUser.passwordResetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
  await findUser.save();

  await sendEmail(
    email,
    `<a href="http://localhost:3000/forgetpass/newpass?resettoken=${resetToken}">Нууц үг сэргээх холбоос</a>`
  );
  res.status(200).json({ message: "Нууц үг сэргээх имэйл илгээлээ" });
};

export const verifyPassword = async (req: Request, res: Response) => {
  const { password, resetToken } = req.body;
  console.log("==>", password, resetToken);
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const findUser = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetTokenExpire: { $gt: Date.now() },
  });
  if (!findUser) {
    return res
      .status(400)
      .json({ message: "Таны нууц үг сэргээх хугацаа дууссан байна:" });
  }
  findUser.password = password;
  await findUser.save();
  res.status(200).json({ message: "Нууц үг  амжилттэй сэргээлээ" });
};
