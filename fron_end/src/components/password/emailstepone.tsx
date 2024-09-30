import { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailStepOneProps {
  email: string;
  handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSendOtp: () => void;
}

const EmailStepOne: React.FC<EmailStepOneProps> = ({
  email,
  handleEmail,
  handleSendOtp,
}) => {
  return (
    <div className="flex flex-col w-[334px] justify-center m-auto gap-4 py-4 my-24">
      <p className="text-center text-2xl font-bold">Нууц үг сэргээх</p>
      <Input
        placeholder="Имэйл хаяг"
        className="rounded-2xl"
        type="email"
        value={email}
        onChange={handleEmail}
      />
      <Button
        className="rounded-2xl bg-blue-600 hover:bg-white hover:text-black"
        onClick={handleSendOtp}
      >
        Илгээх
      </Button>
    </div>
  );
};

export default EmailStepOne;
