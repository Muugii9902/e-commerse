// components/password/emailsteptwo.tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface EmailStepTwoProps {
  email: string;
  otpValue: string;
  countDown: number;
  handleConfirmOtp: (value: string) => void;
  handleResendOtp: () => void;
}

const EmailStepTwo: React.FC<EmailStepTwoProps> = ({
  email,
  otpValue,
  countDown,
  handleConfirmOtp,
  handleResendOtp,
}) => {
  return (
    <div className="py-8 items-center justify-center flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Баталгаажуулах</h1>
      <p>{`“${email}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу`}</p>
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={otpValue}
        onChange={handleConfirmOtp}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p>Дахин илгээх ({countDown})</p>
      <button
        onClick={handleResendOtp}
        className={`text-blue-500 ${countDown > 0 ? "cursor-not-allowed" : ""}`}
        disabled={countDown > 0}
      >
        {countDown > 0 ? `Дахин илгээх (${countDown})` : "Дахин OTP илгээх"}
      </button>
    </div>
  );
};

export default EmailStepTwo;
