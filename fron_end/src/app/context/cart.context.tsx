"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { UserContext } from "./user.context";
import axios from "axios";
import { toast } from "react-toastify";

interface ICart {
  productId: string;
  name: string;
  image: string[];
  price: number;
  totalAmount: number;
  quantity: number;
}

interface ICartContext {
  cart: ICart[];
  cartProduct: ICart;
  fetchCartData: () => void;
  addCartProduct: () => void;
  setCartProduct: Dispatch<SetStateAction<ICart>>;
}

export const CartContext = createContext<ICartContext>({
  cart: [],
  cartProduct: {
    productId: "",
    totalAmount: 0,
    quantity: 0,
    name: "",
    image: [],
    price: 0,
  },
  fetchCartData: () => {},
  addCartProduct: () => {},
  setCartProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);

  const [cart, setCart] = useState<ICart[]>([]);
  const [cartProduct, setCartProduct] = useState<ICart>({
    productId: "",
    totalAmount: 0,
    quantity: 0,
    name: "",
    image: [],
    price: 0,
  });

  const addCartProduct = async () => {
    const { productId, totalAmount, quantity } = cartProduct;
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/carts`, {
        userId: user?._id,
        productId,
        totalAmount,
        quantity,
      });

      toast.success("success");
    } catch (error: any) {
      console.log("cart list", error);
      toast.error("error carts listeee ");
    }
  };

  const fetchCartData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/carts`);
      setCart(res.data.allCarts);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);
  console.log("ccaartaa", cart);
  console.log("useree", user);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCartData,
        addCartProduct,
        setCartProduct,
        cartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
