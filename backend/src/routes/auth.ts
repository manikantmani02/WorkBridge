import { Router } from "express";
import { OtpModel } from "../models/Otp";
import { UserModel, UserRole } from "../models/User";
import { generateOtp } from "../utils/otp";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/send-otp", async (req, res) => {
  try {
    const { phone, role } = req.body as { phone?: string; role?: UserRole };
    if (!phone || !role) {
      return res.status(400).json({ message: "phone and role are required" });
    }
    if (!["worker", "customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + env.otpExpiryMinutes * 60 * 1000);
    await OtpModel.findOneAndUpdate(
      { phone },
      { phone, code, role, expiresAt },
      { upsert: true, new: true }
    );
    console.log(`OTP for ${phone}: ${code}`);
    return res.json({ message: "OTP sent (console/SMS provider hook)", expiresAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body as { phone?: string; otp?: string };
    if (!phone || !otp) {
      return res.status(400).json({ message: "phone and otp are required" });
    }
    const record = await OtpModel.findOne({ phone });
    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }
    if (record.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (record.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    const existingUser = await UserModel.findOne({ phone });
    const role = record.role;
    const user = existingUser || (await UserModel.create({ phone, role }));
    await OtpModel.deleteOne({ _id: record._id });
    const token = jwt.sign({ userId: user._id, phone, role }, env.jwtSecret, {
      expiresIn: "7d",
    });
    return res.json({ token, user: { id: user._id, phone: user.phone, role: user.role } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = await UserModel.findById(req.auth?.userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
});

export default router;
