"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// import { EmailIcon } from "@/icons";

const Email = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [countDown, setCountDown] = useState(30);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = async () => {
    console.log(email);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/forget-password",
        { email }
      );
      if (res.status === 200) {
        setStep(step + 1);
      }
    } catch (error) {
      toast.error("Имэйл илгээхэд алдаа гарлаа");
    }
    // router.push("/forgetpass/otp");
  };

  const handleConfirmOtp = async (value: string) => {
    setOtpValue(value);
    if (value.length === 4) {
      // router.push("/forgetpass/newpass");
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/verify-otp",
          { email, otpValue }
        );
        if (res.status === 200) {
          toast.success(
            "Нууц үг сэргээх холбоосыг таны имэйл хаяг руу явууллаа."
          );
          router.push("/login");
        }
      } catch (error) {
        toast.error("Имэйл илгээхэд алдаа гарлаа");
      }
    }
  };

  const handleResendOtp = () => {
    setCountDown(30);
  };

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [countDown]);

  return (
    <div className="h-[calc(100vh-350px)] flex flex-col items-center">
      <div className="w-[320px] mt-24">
        {step === 1 && (
          <>
            <h1 className="text-2xl font-semibold mb-8 text-center">
              Нууц үг сэргээх
            </h1>
            <div className="flex flex-col gap-4 text-sm">
              <Input
                type="email"
                placeholder="Имэйл хаяг оруулах"
                className="input-primary"
                onChange={handleEmail}
              />
              <Button className="button-primary" onClick={handleSendOtp}>
                Илгээх
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="h-[calc(100vh-350px)] flex flex-col items-center mt-24">
            {/* <EmailIcon /> */}
            <h1 className="mt-7 text-2xl font-bold">Баталгаажуулах</h1>
            <p className="mt-2 mb-6 text-text-primary">
              {`“${email}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу`}
            </p>
            <div className="flex flex-col gap-4 text-sm">
              <InputOTP
                maxLength={4}
                value={otpValue}
                onChange={handleConfirmOtp}
              >
                <InputOTPGroup className="bg-white">
                  <InputOTPSlot className="w-14 h-14" index={0} />
                  <InputOTPSlot className="w-14 h-14" index={1} />
                  <InputOTPSlot className="w-14 h-14" index={2} />
                  <InputOTPSlot className="w-14 h-14" index={3} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                className="cursor-pointer text-muted-foreground mt-12 underline text-sm font-medium"
                onClick={handleResendOtp}
                variant="link"
              >
                Дахин илгээх ({countDown})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Email;
