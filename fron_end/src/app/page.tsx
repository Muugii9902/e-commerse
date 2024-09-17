"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>(5);
  const mines = () => {
    setCount(count - 1);
  };
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div className="text-center p-10">
      <h1>Welcome E-commerce</h1>
      <div>
        <Button variant="outline" onClick={mines}>
          -
        </Button>
        <Label className="px-10">{count}</Label>
        <Button onClick={add}>+</Button>
      </div>
    </div>
  );
}
