"use client";

import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";

const BuyProduct = () => {
  return (
    <div className="max-w-[1440px] h-[500px]">
      <div className="w-[256px] m-auto">
        <ul className="steps m-auto p-10">
          <li className="step step-info"></li>
          <li className="step "></li>
          <li className="step "></li>
        </ul>
      </div>
      <div className="max-w-[638px] m-auto p-5">
        <p className="mb-5">1.Сагс (4)</p>
        <div className="w-[574px] flex justify-between border p-4 rounded-md">
          <div className="flex">
            <img
              src="/images/pro1.png"
              alt=""
              className="h-[100px] rounded-sm"
            />
          </div>
          <div>
            <p>Chunky Glyph Tee</p>
            <div className="flex gap-5 items-center">
              <Button className="rounded-full">+</Button>
              <p>120000</p>
              <Button className="rounded-full">-</Button>
            </div>
            <p>120000</p>
          </div>
          <div>
            <FaRegTrashAlt size={20} />
          </div>
        </div>
        <Button className="bg-[#2563EB] rounded-full items-end mt-10">
          Сагсанд нэмэх
        </Button>
      </div>
    </div>
  );
};

export default BuyProduct;
