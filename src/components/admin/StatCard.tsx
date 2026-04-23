interface StatCardProps {
  title: string;
  value: number | string;
  error?: string;
  trend?: string;
}

export function StatCard({ title, value, error, trend }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-blue-500/20">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">
          {title.replace(/ /g, '_')}
        </p>
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      </div>
      
      {error ? (
        <div className="mt-2">
          <p className="font-mono text-[10px] uppercase text-rose-500/80">ERR_SIGNAL_LOST</p>
          <div className="h-[1px] w-full bg-rose-500/10 my-2" />
          <p className="font-mono text-[9px] text-slate-600 uppercase">Data_Corrupted</p>
        </div>
      ) : (
        <div className="flex items-baseline gap-2">
          <p className="font-mono text-4xl font-light tracking-tighter text-white">
            {typeof value === 'number' ? value.toString().padStart(2, '0') : value}
          </p>
          {trend && (
            <span className="font-mono text-[10px] text-blue-500/40 uppercase">
              {trend}
            </span>
          )}
        </div>
      )}

      {/* Technical metadata footer */}
      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-blue-500/20" />
          <span className="font-mono text-[8px] text-slate-600 uppercase tracking-wider">
            Status: Active
          </span>
        </div>
        <span className="font-mono text-[8px] text-slate-700 uppercase">
          0x{Math.random().toString(16).substring(2, 6).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
