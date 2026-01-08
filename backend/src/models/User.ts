import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "worker" | "customer" | "admin";

export interface IUser extends Document {
  phone: string;
  role: UserRole;
  name?: string;
  skills?: string[];
  rating?: number;
  totalEarnings?: number;
  avatarUrl?: string;
  availability?: "available" | "busy" | "offline";
}

const UserSchema = new Schema<IUser>(
  {
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["worker", "customer", "admin"], required: true },
    name: { type: String },
    skills: { type: [String], default: [] },
    rating: { type: Number, default: 5 },
    totalEarnings: { type: Number, default: 0 },
    avatarUrl: { type: String },
    availability: { type: String, enum: ["available", "busy", "offline"], default: "available" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
