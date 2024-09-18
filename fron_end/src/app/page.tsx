"use client";
import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
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
    <div className="gap 10">
      <Header />
      <Footer />
    </div>
  );
}
