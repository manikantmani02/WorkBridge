type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DashboardCard({ title, children }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-slate-700 text-sm space-y-2">{children}</div>
    </div>
  );
}
