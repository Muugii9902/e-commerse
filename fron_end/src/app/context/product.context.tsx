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
  _id: string;
  quantity: number;
  discount: number;
  category: string;
}

interface IproductContext {
  products: IProduct[];
  selectedProduct: IProduct | null;
  selectedProductId: string | null;
  fetchProductData: () => void;
  selectProduct: (id: string) => void;

  setSelectedProductId: (id: string) => void;
}

export const ProductContext = createContext<IproductContext>({
  products: [],
  selectedProduct: null,
  selectedProductId: null,
  fetchProductData: () => {},
  selectProduct: () => {},
  setSelectedProductId: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const fetchProductData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/products/product`
      );
      setProducts(res.data.user);
      console.log("bar", res.data.user);
    } catch (error) {
      console.error("Барааг авахад алдаа гарлаа:", error);
    }
  };
  const selectProduct = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/product/${id}`);
      setSelectedProduct(res.data.product); // Сонгосон барааны мэдээлэл
      console.log("Сонгосон барааны мэдээлэл:", res.data.product);
    } catch (error) {
      console.error("Сонгосон барааг авахад алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        selectedProductId,
        fetchProductData,
        selectProduct,
        setSelectedProductId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
