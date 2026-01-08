"use client";

import DashboardCard from "@/components/DashboardCard";
import { motion } from "framer-motion";

const feed = [
  { title: "House cleaning - Andheri", pay: "₹800", distance: "2.1 km" },
  { title: "Electric repair - Bandra", pay: "₹1,200", distance: "4.0 km" },
];

export default function WorkerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Worker</p>
            <h1 className="text-3xl font-bold">Your jobs and earnings</h1>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-white font-semibold shadow">
            Toggle Availability
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard title="Today&#39;s Earnings">
            <p className="text-3xl font-bold">₹2,150</p>
            <p className="text-slate-500 text-sm">2 completed jobs</p>
          </DashboardCard>
          <DashboardCard title="Rating">
            <p className="text-3xl font-bold">4.8</p>
            <p className="text-slate-500 text-sm">from 120 reviews</p>
          </DashboardCard>
          <DashboardCard title="Payouts">
            <p className="text-3xl font-bold">₹12,430</p>
            <p className="text-slate-500 text-sm">Next settlement: Friday</p>
          </DashboardCard>
        </div>

        <DashboardCard title="Nearby jobs">
          <div className="grid gap-3 md:grid-cols-2">
            {feed.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-200 p-3"
              >
                <p className="font-semibold">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.distance} · {item.pay}</p>
                <button className="mt-2 rounded-lg bg-accent px-3 py-2 text-white text-sm font-semibold">
                  Accept
                </button>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
