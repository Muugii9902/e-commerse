import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    size,
    images,
    isNew,
    quantity,
    discount,
    category,
  } = req.body;

  try {
    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const product = await Product.create(req.body);

    res
      .status(201)
      .json({ message: "Бүтээгдэхүүн амжилттай үүсгэгдлээ", product });
  } catch (error) {
    res.status(401).json({ message: "Алдаа гарлаа", error });
  }
};
