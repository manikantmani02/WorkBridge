"use client";

import DashboardCard from "@/components/DashboardCard";
import { motion } from "framer-motion";

const workers = [
  { name: "Rohit Kumar", skill: "Plumber", rating: 4.9, distance: "1.2 km" },
  { name: "Sita Devi", skill: "Cleaner", rating: 4.7, distance: "0.8 km" },
];

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Customer</p>
            <h1 className="text-3xl font-bold">Find and book workers</h1>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-white font-semibold shadow">
            Post a Job
          </button>
        </div>

        <DashboardCard title="Recommended workers">
          <div className="grid gap-3 md:grid-cols-2">
            {workers.map((worker) => (
              <motion.div
                key={worker.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-slate-200 p-3"
              >
                <p className="font-semibold">{worker.name}</p>
                <p className="text-slate-500 text-sm">{worker.skill} · {worker.distance}</p>
                <p className="text-sm font-semibold text-primary">⭐ {worker.rating}</p>
                <button className="mt-2 rounded-lg bg-accent px-3 py-2 text-white text-sm font-semibold">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Active bookings">
          <div className="space-y-2 text-sm text-slate-600">
            <p>No active bookings. Create one to see live tracking.</p>
          </div>
        </DashboardCard>
      </div>
    </main>
  );
}
