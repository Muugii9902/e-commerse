import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Нэр эсвэл нууц үг хоосон байж болохгүй." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "burtgel uusgegui bnaa" });
    } else {
      const isCheck =
        user && bcrypt.compareSync(password, user.password.toString());

      if (!isCheck) {
        return res.status(400).json({
          message: "Хэрэглэгчийн имэйл эсвэл нууц үг тохирохгүй байна.",
        });
      } else {
        const token = jwt.sign({ id: user._id }, "JWT_TOKEN_PASS@123", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "success", token });
      }
    }
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
export const forgetPass = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("first", email);
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "hereglegch oldsongv" });
    } else {
      const ischeck = bcrypt.compareSync(password, user.password.toString());
      if (!ischeck) {
        res.status(400).json({ message: "email or password buruu baina" });
      } else {
        const token = jwt.sign({ id: user.id }, "JWT_TOKEN_PASS@123", {
          expiresIn: "10h",
        });
        res.status(201).json({
          message: "success",
          token,
          user,
          // optmail(email)
        });
      }
    }
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
