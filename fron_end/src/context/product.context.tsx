"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface IProduct {
  name: string;
  price: string;
  description: string;
  size: string;
  images: string;
  isNew: boolean;
  quantity: number;
  discount: number;
  category: string;
}

interface IproductContext {
  products: IProduct[];
  fetchProductData: () => void;
}

export const ProductContext = createContext<IproductContext>({
  products: [],
  fetchProductData: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProductData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product`);
      setProducts(res.data.user);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProductData }}>
      {children}
    </ProductContext.Provider>
  );
};
