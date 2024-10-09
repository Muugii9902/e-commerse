import { Request, Response } from "express";
import Cart from "../models/cart.models";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const allCarts = await Cart.find({});
    res.status(200).json({ message: "success", allCarts: allCarts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: " get carts error ", error: error });
  }
};

export const createCart = async (req: Request, res: Response) => {
  const { userId, productId, totalAmount, quantity } = req.body;
  try {
    const findUserCart = await Cart.findOne({ user: userId });
    if (!findUserCart) {
      const cart = await Cart.create({
        user: userId,
        products: {
          product: productId,
          quantity,
        },
        totalAmount,
      });
      return res.status(200).json({ message: "created new cart", cart });
    }

    const findDuplicated = findUserCart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (findDuplicated > -1) {
      findUserCart.products[findDuplicated].quantity += quantity;
    } else {
      findUserCart.products.push({ product: productId, quantity });
    }

    findUserCart.products.push({ product: productId, quantity });
    const updatedCart = await findUserCart.save();
    res.status(200).json({ message: "updated card", updatedCart });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to read carts",
    });
  }
};
