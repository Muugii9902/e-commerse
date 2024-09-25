"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/utils/utils";

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    const { email, password } = userData;
    try {
      const res = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      console.log("resp", res);
      if (res.status === 200) {
        toast.success("Амжилттай нэвтэрлээ", { autoClose: 1000 });
        const { token } = res.data;
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error) {
      console.log("There was an error signing in:", error);
      toast.error("Нэвтрэхэд алдаа гарлаа");
    }
  };
  return (
    <div className="max-w-full bg-gray-100">
      <div className="w-full h-screen m-auto">
        <div className="flex flex-col items-center m-auto p-32">
          <h1>Нэвтрэх</h1>
          <div className="w-[334px] h-[36px] rounded-2xl flex flex-col gap-4 mt-6">
            <Input
              placeholder="Имэйл хаяг"
              className="rounded-2xl"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              placeholder="Нууц үг"
              className="rounded-2xl"
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Button
              className="w-[334px] h-[36px] rounded-2xl bg-blue-700"
              onClick={login}
            >
              Нэвтрэх
            </Button>
            <p className="underline m-auto mt-4">Нууц үг мартсан</p>
            <Button
              className="bg-white w-[334px] h-[36px] rounded-2xl text-blue-500 mt-12"
              onClick={() => {
                router.push("/signup");
              }}
              variant="outline"
            >
              Бүртгүүлэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
