"use client";

import { Hero } from "@/components/home";
import {
  FeaturedProductCard,
  ProductCard,
} from "@/components/product-card/product-card";
import { Slider } from "@/components/ui/slider";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Hero />
      <div className="mt-6 mb-24 max-w-[1100px] mx-auto grid grid-cols-4 gap-y-12 gap-x-5">
        {products.map((product, index) => {
          return (
            <>
              {index === 6 || index === 7 ? (
                <FeaturedProductCard
                  key={index}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  discount={product.discount}
                />
              ) : (
                <ProductCard
                  key={index}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  discount={product.discount}
                />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
