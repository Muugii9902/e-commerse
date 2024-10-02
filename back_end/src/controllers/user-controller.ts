import { Request, Response } from "express";
import User from "../models/user.model";

export const CurrentUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const findUser = await User.findById({ id });
    console.log("user", findUser);
    res.status(200).json({ message: "Success", user: findUser });
  } catch (error) {
    console.log("error", error);
  }
};
