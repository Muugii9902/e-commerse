"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../context/cart.context";

const BuyProduct = () => {
  const { fetchCartData, cart } = useContext(CartContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  console.log("Сагсанд байгаа бараа", cart);

  const cartProducts = cart;

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
        <p className="mb-5">1. Сагс ({cartProducts.length})</p>
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => (
            <div className="w-[574px] flex justify-between border p-4 rounded-md mb-4">
              <div className="flex">
                {item.image.map((imgSrc, index) => (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`${item.name} зураг ${index + 1}`}
                    className="h-[100px] rounded-sm"
                  />
                ))}
              </div>
              <div>
                <p>{item.name}</p>
                <div className="flex gap-5 items-center">
                  <Button className="rounded-full">+</Button>
                  <p>{item.price}₮</p>
                  <Button className="rounded-full">-</Button>
                </div>
                <p>{item.totalAmount}₮</p>
              </div>
              <div>
                <FaRegTrashAlt size={20} onClick={() => {}} />
              </div>
            </div>
          ))
        ) : (
          <p>Сагс хоосон байна.</p>
        )}
        <Button className="bg-[#2563EB] rounded-full items-end mt-10">
          Сагсанд
        </Button>
      </div>
    </div>
  );
};

export default BuyProduct;
