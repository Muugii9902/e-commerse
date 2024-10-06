"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useContext } from "react";
import { CategoryContext } from "../context/category.context";
import { ProductContext } from "../context/product.context";

const Category = () => {
  const size = ["xs", "s", "l", "xl", "xxl"];
  const { products } = useContext(ProductContext);
  const { category } = useContext(CategoryContext);
  console.log(category);
  return (
    <div className="container m-auto flex gap-44 py-16">
      <div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Ангилал</p>
          {category.map((cate, i) => {
            return (
              <div className="flex items-center space-x-2">
                <Checkbox id={`terms${i}`} />
                <label
                  htmlFor={`terms${i}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {cate.name}
                </label>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 mt-12">
          <p className="font-bold">Хэмжээ</p>
          {size.map((hemj, i) => {
            return (
              <div className="flex items-center space-x-2">
                <Checkbox id={`terms${i + 6}`} />
                <label
                  htmlFor={`terms${i + 6}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {hemj}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {products?.map((product, i) => {
          return (
            <>
              <div>
                <div className="h-[331px] w-full rounded-2xl overflow-hidden">
                  <img src={product.images[0]} alt="" className="w-full" />
                </div>

                <p>{product.name}</p>
                <p className="font-bold">{product.price}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Category;
