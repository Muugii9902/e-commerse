"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

const OneProduct = () => {
  const [isTrue, setIstrue] = useState(true);
  const { id } = useParams();
  const [product, setProducts] = useState({ name: "" });
  const getProduct = async (id: string | string[]) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/products/${id}`
      );
      setProducts(res.data.product);
    } catch (error) {
      toast.error("aldaa garlaa");
    }
  };
  console.log("baraa", product);
  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <div className="flex  container m-auto p-12 gap-5">
      <div className="flex-1 flex gap-5  justify-end items-center">
        <div className=" flex flex-col gap-3">
          <img
            src="/image/1st.png"
            alt=""
            className="w-[67px] h-[100px] rounded-xl"
          />
          <img
            src="/image/1st.png"
            alt=""
            className="w-[67px] h-[100px] rounded-xl"
          />
          <img
            src="/image/1st.png"
            alt=""
            className="w-[67px] h-[100px] rounded-xl"
          />
          <img
            src="/image/1st.png"
            alt=""
            className="w-[67px] h-[100px] rounded-xl"
          />
        </div>
        <div className="w-[422px] h-[521px] overflow-hidden rounded-xl">
          <img src="/image/1st.png" alt="" />
        </div>
      </div>
      <div className="flex-1 ">
        <span className="text-xs font-bold py-1 px-3 border border-blue-600 rounded-2xl">
          New
        </span>
        <div className="flex items-center gap-4">
          <p className="text-2xl font-bold">Name</p>
          {isTrue ? (
            <CiHeart
              className="text-3xl"
              onClick={() => {
                setIstrue(false);
              }}
            />
          ) : (
            <FaHeart
              className="text-2xl text-red-600"
              onClick={() => {
                setIstrue(true);
              }}
            />
          )}
        </div>
        <p>Зэрлэг цэцгийн зурагтай даавуун материалтай цамц</p>
        <div>
          <p>Хэмжээний заавар</p>
          <div className="flex gap-2 text-xs">
            <p className=" border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300">
              S
            </p>
            <p className="border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300">
              M
            </p>
            <p className="border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300">
              L
            </p>
            <p className=" border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300">
              XL
            </p>
            <p className=" border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-300">
              2XL
            </p>
          </div>
        </div>
        <div className="">
          <button>-</button>
          <p>1</p>
          <button>+</button>
        </div>
        <div>
          <div>
            <p>Үнэлгээ</p>
            <button>бүгдийг харах</button>
          </div>
          <div>
            <p>stars</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OneProduct;
