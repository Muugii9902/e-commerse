"use client";

import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { CiHeart } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Rating from "@/components/rating";
import { UserContext } from "../context/user.context";

const ProductDetail = () => {
  const { user } = useContext(UserContext);
  const [isTrue, setIstrue] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);

  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    size: "",
    images: "",
    isNew: true,
    _id: "",
    quantity: 0,
    discount: 0,
    category: "",
  });
  const getProduct = async (id: string | string[]) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/products/${id}`
      );
      setProduct(res.data.product);
      console.log("1 baraa", res.data.product);
    } catch (error) {
      console.log("error", error);
      toast.error("aldaa garlaa product detail error");
    }
  };

  const addToCart = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/carts/create-cart`,
        {
          userId: user?._id,
          productId: id,
          quantity: productQuantity,
        }
      );
      if (res.status === 200) {
        toast.success("Product added to cart");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  const handleRatingSelect = (rating: number) => {
    console.log("Сонгосон үнэлгээ: ", rating);
  };
  console.log("hereglegch", user);

  return (
    <div className="w-full h-screen ">
      <div className="flex  container  m-auto  p-12 gap-5">
        <div className="flex-1 flex gap-5  justify-end items-center">
          <div className=" flex flex-col gap-3">
            <img
              src={product.images}
              alt=""
              className="w-[67px] h-[100px] rounded-xl"
            />
            <img
              src={product.images}
              alt=""
              className="w-[67px] h-[100px] rounded-xl"
            />
            <img
              src={product.images}
              alt=""
              className="w-[67px] h-[100px] rounded-xl"
            />
            <img
              src={product.images}
              alt=""
              className="w-[67px] h-[100px] rounded-xl"
            />
          </div>
          <div className="w-[422px] h-[521px] overflow-hidden rounded-xl">
            <img src={product.images} alt="" />
          </div>
        </div>
        <div className="flex-1 ">
          <span className="text-xs font-bold py-1 px-3 border border-blue-600 rounded-2xl">
            New
          </span>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">{product.name}</p>
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
          <p>{product.description}</p>
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
          <div className="flex items-center gap-3 py-4">
            <button
              className="border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-400"
              onClick={() => setProductQuantity(productQuantity - 1)}
            >
              -
            </button>
            <p>{productQuantity}</p>
            <button
              className="border border-black rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-400"
              onClick={() => setProductQuantity(productQuantity + 1)}
            >
              +
            </button>
          </div>
          <div className="flex flex-col gap-1 py-4">
            <p className="text-xl font-bold">{product.price}</p>
            <div className="py-4">
              <Button className="bg-[#2563EB] rounded-2xl" onClick={addToCart}>
                Сагсанд нэмэх
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p>Үнэлгээ</p>
              <Rating onRatingSelect={handleRatingSelect} />
            </div>
            <div className="py-4">
              <button>бүгдийг харах</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto">
        <p>Холбоотой бараа</p>
      </div>
    </div>
  );
};
export default ProductDetail;
