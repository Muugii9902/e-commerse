"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const Email = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);

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
        toast.success("tanii emailruu 4 orontoi code ilgeelee");
      }
    } catch (error) {
      console.log("email ilgeehed aldaa garlaa", error);
      toast.error("email ilgeehed aldaa garlaa");
    }
  };

  const handleResendOTP = () => {
    setCountdown(60);
  };
  const handleConfirmOTP = async (value: string) => {
    setOtpValue(value);
    if (value.length === 4) {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/auth/verify-otp",
          { email, otpValue: value }
        );
        if (res.status === 200) {
          toast.success("nuuts ug sergeeh holboosiig emailruu ilgeelee");
          router.push("/signin");
        }
      } catch (error) {
        toast.error("OTP tohirohgui baina");
      }
    }
  };
  useEffect(() => {
    if (countdown > 0) {
      const countDown = setInterval(() => {
        setCountdown((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [countdown]);
  return (
    <div className="w-[full] h-screen flex justify-center">
      {step === 1 && (
        <div className="flex flex-col w-[334px] justify-center m-auto gap-4 py-4 my-24">
          <p className="text-center text-2xl font-bold">Нууц үг сэргээх</p>
          <Input
            placeholder="Имэйл хаяг"
            className="rounded-2xl"
            type="email"
            onChange={handleEmail}
          />

          <Button
            className="rounded-2xl bg-blue-600 hover:bg-white hover:text-black"
            onClick={handleSendOtp}
          >
            Илгээх
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="py-8 items-center justify-center flex flex-col gap-6">
          <img src="" alt="" />
          <h1 className="text-2xl font-bold">Баталгаажуулах</h1>
          <p>{`“${email}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу`}</p>
          <InputOTP
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otpValue}
            onChange={handleConfirmOTP}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <p>Дахин илгээх ({countdown})</p>
        </div>
      )}
    </div>
  );
};
export default Email;
