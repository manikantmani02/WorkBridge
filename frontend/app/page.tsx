"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl space-y-6"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">WorkBridge E-Labour</p>
        <h1 className="text-4xl md:text-5xl font-bold">Connect. Book. Get Work Done.</h1>
        <p className="text-lg text-slate-600">
          LinkedIn-style professional profiles for labour workforce with instant booking, real-time
          tracking, ratings, and secure payments.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-full bg-primary px-6 py-3 text-white font-semibold shadow-lg"
          >
            Login / Sign up
          </Link>
          <Link
            href="/dashboard/customer"
            className="rounded-full border border-primary px-6 py-3 text-primary font-semibold"
          >
            Customer Dashboard
          </Link>
          <Link
            href="/dashboard/worker"
            className="rounded-full border border-accent px-6 py-3 text-accent font-semibold"
          >
            Worker Dashboard
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
