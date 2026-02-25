interface StatCardProps {
  title: string;
  value: number | string;
  error?: string;
}

export function StatCard({ title, value, error }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/60 p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {title}
      </p>
      {error ? (
        <p className="mt-2 text-sm text-rose-400">Falha ao carregar</p>
      ) : (
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      )}
    </div>
  );
}
