"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ICategory {
  name: string;
  discription: string;
}

interface ICategoryContext {
  category: ICategory[];
  fetchCategoryData: () => void;
}
export const CategoryContext = createContext<ICategoryContext>({
  category: [],
  fetchCategoryData: () => {},
});

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<ICategory[]>([]);

  const fetchCategoryData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/category`);
      setCategory(res.data.categories);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);
  return (
    <CategoryContext.Provider value={{ category, fetchCategoryData }}>
      {children}
    </CategoryContext.Provider>
  );
};
