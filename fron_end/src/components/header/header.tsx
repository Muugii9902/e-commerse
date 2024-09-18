import React from "react";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <div className=" w-full h-[68px] grid grid-cols-3 bg-black">
      <div className="flex gap-5">
        <img src="./images/logo.png" alt="" />
        <h1 className="text-gray-50">Ангилал</h1>
      </div>
      <div>
        <Input placeholder="Бүтээгдэхүүн хайх" type=""></Input>
      </div>
      <div></div>
    </div>
  );
};
