import { Request, Response } from "express";
import Product from "../models/product.model";

export const getAllproducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find({});
    console.log("products", allProducts);
    res.status(200).json({ message: "success", user: allProducts });
  } catch (error: any) {
    console.log(error.message);
    res.status(404).json({ message: "aldaa garlaa", error: error.message });
  }
};

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
    const createProduct = await Product.create(req.body);

    res
      .status(201)
      .json({ message: "Бүтээгдэхүүн амжилттай үүсгэгдлээ", createProduct });
  } catch (error) {
    res.status(401).json({ message: "Алдаа гарлаа", error });
  }
};
