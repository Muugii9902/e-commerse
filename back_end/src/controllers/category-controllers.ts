import { Request, Response } from "express";
import Category from "../models/category.models";

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).json({ message: "Хоосон утга байж болохгүй" });
    }

    const category = await Category.create({ name, description });
    console.log("category", name);

    res
      .status(201)
      .json({ message: "Категори амжилттай үүсгэгдлээ", category });
  } catch (error) {
    res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const allCategories = await Category.find({});
    res.status(201).json({ message: "Success", categories: allCategories });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
