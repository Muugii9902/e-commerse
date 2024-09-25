import { Request, Response } from "express";
import User from "../models/user.model";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.find({});
    res.status(200).json({ message: "Success", user: user });
  } catch (error) {
    console.log("error", error);
  }
};
