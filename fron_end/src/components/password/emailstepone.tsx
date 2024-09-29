import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface EmailStepOne {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSendOtp: () => void;
}

const EmailStepOne = ({ email, handleEmail, handleSendOtp }: EmailStepOne) => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <h1 className="text-2xl font-semibold mb-8 text-center">
        Нууц үг сэргээх
      </h1>
      <Input
        type="email"
        placeholder="Имэйл хаяг оруулах"
        className="input-primary"
        value={email}
        onChange={handleEmail}
      />
      <Button className="button-primary" onClick={handleSendOtp}>
        Илгээх
      </Button>
    </div>
  );
};

export default EmailStepOne;
