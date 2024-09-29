"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import EmailStepOne from "@/components/password/emailstepone";
import EmailStepTwo from "@/components/password/emailsteptwo";

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
  };

  const handleConfirmOtp = async (value: string) => {
    setOtpValue(value);
    if (value.length === 4) {
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
        {step === 1 ? (
          <EmailStepOne
            email={email}
            handleEmail={handleEmail}
            handleSendOtp={handleSendOtp}
          />
        ) : (
          <EmailStepTwo
            email={email}
            otpValue={otpValue}
            countDown={countDown}
            handleConfirmOtp={handleConfirmOtp}
            handleResendOtp={handleResendOtp}
          />
        )}
      </div>
    </div>
  );
};

export default Email;
