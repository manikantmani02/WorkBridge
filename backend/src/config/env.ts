import dotenv from "dotenv";

dotenv.config();

const required = ["MONGO_URI", "JWT_SECRET", "CORS_ORIGIN"] as const;

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required env var ${key}`);
  }
});

export const env = {
  port: parseInt(process.env.PORT || "4000", 10),
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  otpExpiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES || "10", 10),
  corsOrigin: process.env.CORS_ORIGIN as string,
};
