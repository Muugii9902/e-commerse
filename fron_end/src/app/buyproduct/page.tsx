"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../context/cart.context";

const BuyProduct = () => {
  const { fetchCartData, cartProduct } = useContext(CartContext);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <div className="max-w-[1440px] h-auto">
      <div className="w-[256px] m-auto">
        <ul className="steps m-auto p-10">
          <li className="step step-info"></li>
          <li className="step"></li>
          <li className="step"></li>
        </ul>
      </div>
      <div className="max-w-[638px] m-auto p-5">
        <p className="mb-5">1. Сагс ({cartProduct.length})</p>
        {cartProduct.length > 0 ? (
          cartProduct.map((item) => (
            <div
              key={item.productId}
              className="w-[574px] flex justify-between border p-4 rounded-md mb-4"
            >
              <div className="flex">
                <img
                  src={item.image || "/images/pro1.png"} // Нэмэлт зураг оруулах
                  alt={item.name}
                  className="h-[100px] rounded-sm"
                />
              </div>
              <div>
                <p>{item.name}</p>
                <div className="flex gap-5 items-center">
                  <Button className="rounded-full">+</Button>
                  <p>{item.price}₮</p>
                  <Button className="rounded-full">-</Button>
                </div>
                <p>{item.totalAmount}₮</p> {/* Нийт дүн */}
              </div>
              <div>
                <FaRegTrashAlt
                  size={20}
                  onClick={() => {
                    /* Устгах функц */
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Сагс хоосон байна.</p>
        )}
        <Button className="bg-[#2563EB] rounded-full items-end mt-10">
          Сагсанд нэмэх
        </Button>
      </div>
    </div>
  );
};

export default BuyProduct;
