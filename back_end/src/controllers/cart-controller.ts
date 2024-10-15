import { Request, Response } from "express";
import Cart from "../models/cart.models";
import { populate } from "dotenv";

export const createCart = async (req: Request, res: Response) => {
  const { userId, productId, totalAmount, quantity } = req.body;
  console.log("====>", req.body);
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

export const getCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const cart = await Cart.findOne({ user: id }).populate("product.product");
    res.status(200).json({ message: "get cart", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to get cart",
    });
  }
};
export const updateCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { productId, newQuantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(400).json({ message: "not found user" });
    }
    const findProduct = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    cart.products[findProduct].quantity = newQuantity;
    const updateCart = await cart.save();
    res.status(200).json({
      message: "update cart",
      updateCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "failed to get carts",
    });
  }
};
