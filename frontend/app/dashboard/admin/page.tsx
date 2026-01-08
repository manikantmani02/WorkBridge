import DashboardCard from "@/components/DashboardCard";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin</p>
            <h1 className="text-3xl font-bold">Platform overview</h1>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-white font-semibold shadow">
            Suspend Worker
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard title="Active users">
            <p className="text-3xl font-bold">12,430</p>
            <p className="text-slate-500 text-sm">Workers + customers</p>
          </DashboardCard>
          <DashboardCard title="Live bookings">
            <p className="text-3xl font-bold">320</p>
            <p className="text-slate-500 text-sm">Across all cities</p>
          </DashboardCard>
          <DashboardCard title="Disputes">
            <p className="text-3xl font-bold">5 open</p>
            <p className="text-slate-500 text-sm">Escalations under review</p>
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
