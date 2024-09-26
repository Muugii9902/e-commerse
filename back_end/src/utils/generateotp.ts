export const generateOtp = (): string => {
  const otp = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return otp;
};
