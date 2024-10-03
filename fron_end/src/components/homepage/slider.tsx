import { ProductContext } from "@/app/context/product.context";
import { useContext } from "react";

const Slider = () => {
  const { products } = useContext(ProductContext);
  console.log("baraaaaa", products);
  return (
    <div>
      <div className="h-[446px]  bg-[url('/images/hoodi.png')] bg-cover bg-[center_top_-40rem] bg-no-repeat px-52 py-7 flex flex-col justify-end gap-4">
        <p className="text-xl">Wild Flower Hoodieee</p>
        <p className="text-4xl font-bold">120'000₮</p>
      </div>
      <div className="m-auto container grid grid-cols-4 gap-5 my-10 grid-row-6">
        {products?.map((product, a) => {
          return (
            <>
              {a === 6 || a === 7 ? (
                <div className="col-span-2 row-span-2">
                  <div className="h-[692px] w-full rounded-2xl overflow-hidden">
                    <img src={product.images[1]} alt="" className="w-full" />
                  </div>
                  <p>{product.name}</p>
                  <p className="font-bold">{product.price}</p>
                </div>
              ) : (
                <div>
                  <div className="h-[331px] w-full rounded-2xl overflow-hidden">
                    <img src={product.images[1]} alt="" className="w-full" />
                  </div>

                  <p>{product.name}</p>
                  <p className="font-bold">{product.price}</p>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Slider;
