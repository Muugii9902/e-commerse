"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cart } from "@/lib/data";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const BuyProduct = () => {
  const [cartData, setCartData] = useState<Cart>([
    {
      product: { _id: "", name: "", price: 0, images: [""], discount: 0 },
      quantity: 0,
    },
  ]);
  const getCartData = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/api/v1/carts/get-cart`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (res.status === 200) {
        setCartData(res.data.cart.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to add to cart");
    }
  };
  const updateQuanity = async (productId: string, newQuantity: number) => {
    setCartData((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    const userToken = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/carts/update-cart`,
        {
          productId,
          newQuantity,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      if (res.status === 200) {
        toast.success("Successfully updated");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to add to cart");
    }
  };
  const deleteCartProduct = async (productId: string) => {
    try {
      const userToken = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:8000/api/v1/carts/delete-cart`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
          data: { productId },
        }
      );
      if (res.status === 200) {
        setCartData((prevCart) =>
          prevCart.filter((item) => item.product._id !== productId)
        );
        toast.success("Successfully deleted product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="h-screen p-4 ">
        {cartData.map((cartProduct) => {
          const { product } = cartProduct;
          return (
            <Card className="p-4 rounded-2xl w-1/2 mb-2" key={product._id}>
              <CardContent className="flex justify-between p-0">
                <div className="flex gap-8 ">
                  <img
                    src={product.images[0]}
                    alt="wishlists"
                    className="w-32 h-28 rounded-2xl"
                  />
                  <div>
                    <p className="font-normal text-base">{product.name}</p>
                    <div className="flex gap-5">
                      <p
                        className="border border-solid border-black px-2 rounded-full cursor-pointer"
                        onClick={() =>
                          updateQuanity(
                            product._id,
                            Math.max(1, cartProduct.quantity - 1)
                          )
                        }
                      >
                        -
                      </p>
                      <p>{cartProduct.quantity}</p>
                      <p
                        className="border border-solid border-black px-2 rounded-full cursor-pointer"
                        onClick={() =>
                          updateQuanity(product._id, cartProduct.quantity + 1)
                        }
                      >
                        +
                      </p>
                    </div>
                    <p className="mt-1 mb-2 text-sm font-bold">
                      {product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      className="text-red-600 cursor-pointer"
                      onClick={() => deleteCartProduct(product._id)}
                    >
                      <FaTrash size={30} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        <Button className="button-primary">Худалдан авах</Button>
      </div>
    </div>
  );
};

export default BuyProduct;
