"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const NewPass = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const params = useSearchParams();

  useEffect(() => {
    const validations = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/.test(password),
    };
    setPasswordValidations(validations);
  }, [password]);

  const handleNewPassword = async () => {
    if (password !== repassword) {
      toast("Алдаа: Пасворд тохирохгүй байна");
      return;
    }
    if (
      !(
        passwordValidations.hasUpperCase &&
        passwordValidations.hasLowerCase &&
        passwordValidations.hasNumber &&
        passwordValidations.hasSpecialChar
      )
    ) {
      toast.error("Алдаа: Нууц үг шаардлагыг хангахгүй байна");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/verify-password",
        { password: password, resetToken: params.get("resettoken") }
      );
      toast.success("Нууц үг амжилттай шинэчлэгдлээ");
      router.push("/login");
    } catch (error) {
      toast.error("Пасворт шинэчлэхэд алдаа гарлаа");
    }
  };

  return (
    <div className="w-[full] h-screen flex justify-center">
      <div className="h-[calc(100vh-350px)] flex flex-col items-center">
        <div className="w-[320px] mt-24">
          <h1 className="text-2xl font-semibold mb-8 text-center">
            Нууц үг сэргээх
          </h1>
          <div className="flex flex-col gap-4 text-sm">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Шинэ нууц үг"
                className="input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiFillEye className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Шинэ нууц үг давтах"
                className="input-primary"
                onChange={(e) => setRePassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiFillEye className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            <ul className="list-disc pl-5 text-xs font-light leading-5 flex flex-col gap-0.5">
              <li
                style={{
                  color: passwordValidations.hasUpperCase ? "green" : "red",
                }}
              >
                Том үсэг орсон байх
              </li>
              <li
                style={{
                  color: passwordValidations.hasLowerCase ? "green" : "red",
                }}
              >
                Жижиг үсэг орсон байх
              </li>
              <li
                style={{
                  color: passwordValidations.hasNumber ? "green" : "red",
                }}
              >
                Тоо орсон байх
              </li>
              <li
                style={{
                  color: passwordValidations.hasSpecialChar ? "green" : "red",
                }}
              >
                Тэмдэгт орсон байх
              </li>
            </ul>
            <Button className="button-primary" onClick={handleNewPassword}>
              Үүсгэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPass;
