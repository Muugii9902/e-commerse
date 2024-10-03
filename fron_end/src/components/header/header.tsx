"use client";
import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { UserContext } from "@/app/context/user.context";
import { DropdownMenuDemo } from "../dropdownpage";

export const Header = () => {
  const { user, fetchUserData } = useContext(UserContext);
  console.log("hahahahahaha", user);

  return (
    <div className="w-full h-[68px] grid-cols-3 bg-black text-white flex justify-between px-8 py-4">
      <div className="flex gap-8">
        <img src="./images/vector.png" alt="Logo" />
        <h1>ECOMMERCE</h1>
        <h1 className="text-gray-50">Ангилал</h1>
      </div>
      <div className="border rounded-full flex p-2 items-center">
        <Search color="white" />
        <Input
          className="border-none"
          placeholder="Бүтээгдэхүүн хайх"
          type="text"
        />
      </div>
      <div className="flex gap-8 items-center">
        <Heart size={24} aria-label="Favorites" />
        <ShoppingCart size={24} aria-label="Shopping Cart" />
        {!user ? (
          <>
            <Button className="w-[101px] px-8 rounded-full border-[#2563EB] border-[1px]">
              <Link href="/signup">Бүртгүүлэх</Link>
            </Button>
            <Button className="bg-blue-700 rounded-full w-[82px] px-3 py-2">
              <Link href="/login">Нэвтрэх</Link>
            </Button>
          </>
        ) : (
          <DropdownMenuDemo />
        )}
      </div>
    </div>
  );
};
