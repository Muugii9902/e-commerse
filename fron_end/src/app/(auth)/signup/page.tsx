"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/utils/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();
  const [userData, setUserDate] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });
  // const [image, setImage] = useState(null);

  const signUp = async () => {
    const { firstname, lastname, email, password, repassword } = userData;
    if (password !== repassword) {
      toast.error("Нууц үг хоорондоо тохирохгүй байна.");
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/signup`, {
        firstname,
        lastname,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success("User successfully signed up", {
          autoClose: 1000,
        });
        router.push("/login");
        console.log("response");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      toast.error("Failed to sign up. Please try again.");
    }
  };
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDate((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div className="bg-gray-100 max-w-full">
      <div className="w-full h-screen p-32 m-auto">
        <div className="w-[334px] h-[436px] flex flex-col items-center m-auto">
          <h1>Бүртгүүлэх</h1>
          <div>
            <div className="flex flex-col gap-4 rounded-2xl mt-6">
              <Input
                type="text"
                placeholder="Нэр"
                name="firstname"
                onChange={handlechange}
              />
              <Input
                type="text"
                placeholder="Овог"
                name="lastname"
                onChange={handlechange}
              />
              <Input
                type="email"
                placeholder="Имэйл хаяг"
                name="email"
                onChange={handlechange}
              />
              <Input
                type="password"
                placeholder="Нууц үг"
                name="password"
                onChange={handlechange}
              />
              <Input
                type="password"
                placeholder="Нууц үг давтах "
                name="repassword"
                onChange={handlechange}
              />
            </div>

            <div>
              <div>
                <ul className="list-disc mt-4">
                  <li>Том үсэг орсон байх</li>
                  <li>Жижиг үсэг орсон байх</li>
                  <li>Тоо орсон байх</li>
                  <li className="text-red-500">Тэмдэгт орсон байх</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-12 mt-4">
              <Button
                className="w-[334px] h-[36px] bg-blue-600 rounded-2xl py-[8px] px-[16px] text-white"
                onClick={signUp}
              >
                Үүсгэх
              </Button>
              <Button className="bg-white text-blue-500 rounded-2xl">
                Нэвтрэх
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
