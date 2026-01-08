import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "./User";

export interface IOtp extends Document {
  phone: string;
  code: string;
  role: UserRole;
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    phone: { type: String, required: true, index: true },
    code: { type: String, required: true },
    role: { type: String, enum: ["worker", "customer", "admin"], required: true },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

export const OtpModel = mongoose.model<IOtp>("Otp", OtpSchema);
