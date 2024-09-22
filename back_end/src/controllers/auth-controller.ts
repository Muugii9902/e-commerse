import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Нэр эсвэл нууц үг хоосон байж болохгүй." });
    }
    const user = await User.findOne({ email });

    const isCheck = user && bcrypt.compareSync(password, user.password);
    if (!isCheck) {
      return res
        .status(401)
        .json({ message: "Нэр эсвэл нууц үг буруу байна." });
    }
    res.status(200).json({ message: "Амжилттай нэвтэрлээ", user });
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа", error });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { fristname, lastname, email, password, role, profile_img, address } =
      req.body;

    if (!fristname || !email || !password) {
      res.status(400).json({ message: "Хоосон утга байж болохгүй." });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const createdUser = await User.create({
      fristname,
      lastname,
      email,
      password: hashedPassword,
      role,
      phoneNumber: " ",
      profile_img,
      address,
    });
    res.status(201).json({ message: "sucsess", user: createdUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
