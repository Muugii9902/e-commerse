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
  totalAmount: number;
  quantity: number;
}

interface ICartContext {
  cart: ICart[];
  cartProduct: ICart;
  fetchCartData: () => void;
  addCartProduct: () => void;
  setCartProduct: Dispatch<
    SetStateAction<{
      productId: string;
      totalAmount: number;
      quantity: number;
    }>
  >;
}
export const CartContext = createContext<ICartContext>({
  cart: [],
  cartProduct: { productId: "", totalAmount: 0, quantity: 0 },
  fetchCartData: () => {},
  addCartProduct: () => {},
  setCartProduct: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState<ICart[]>([]);
  const [cartProduct, setCartProduct] = useState({
    productId: "",
    totalAmount: 0,
    quantity: 0,
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
      console.log("cart list", error.message);
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
