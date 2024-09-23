"use client";

import { Slider } from "@/components/ui/slider";

export default function Home() {
  // const [count, setCount] = useState<number>(5);
  // const mines = () => {
  //   setCount(count - 1);
  // };
  // const add = () => {
  //   setCount(count + 1);
  // };
  return (
    <div className="w-full h-screen">
      <h1>Welcome</h1>
      <Slider />
    </div>
  );
}
