"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useAuthStore, UserRole } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<UserRole>("worker");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const sendOtp = async () => {
    setLoading(true);
    setError(undefined);
    setMessage(undefined);
    try {
      await api.post("/auth/send-otp", { phone, role });
      setStep("verify");
      setMessage("OTP sent (check server console if using dev mode)");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError(undefined);
    setMessage(undefined);
    try {
      const res = await api.post("/auth/verify-otp", { phone, otp });
      const { token, user } = res.data;
      setAuth({ token, role: user.role, phone: user.phone });
      setMessage("Login successful");
      router.push(`/dashboard/${user.role}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8 space-y-6"
      >
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">WorkBridge</p>
          <h1 className="text-3xl font-bold">OTP Login</h1>
          <p className="text-slate-600">Quick access for workers and customers.</p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">Phone</span>
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <div className="flex gap-3">
          {(["worker", "customer"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 rounded-xl border px-4 py-3 font-semibold capitalize ${
                role === r ? "bg-primary text-white" : "border-slate-200 text-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {step === "verify" && (
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-slate-700">OTP</span>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-primary tracking-[0.3em]"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
        )}

        {message && <p className="text-sm text-green-600">{message}</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={step === "request" ? sendOtp : verifyOtp}
          disabled={loading || !phone || (step === "verify" && !otp)}
          className="w-full rounded-xl bg-primary px-4 py-3 text-white font-semibold shadow-lg disabled:opacity-50"
        >
          {loading ? "Please wait" : step === "request" ? "Send OTP" : "Verify & Continue"}
        </button>

        <p className="text-xs text-slate-500">
          OTP is logged in backend console in development. Integrate SMS provider by replacing the log
          in backend auth route.
        </p>
      </motion.div>
    </main>
  );
}
