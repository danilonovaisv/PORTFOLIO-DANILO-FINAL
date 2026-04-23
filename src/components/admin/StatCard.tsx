interface StatCardProps {
  title: string;
  value: number | string;
  error?: string;
  trend?: string;
}

export function StatCard({ title, value, error, trend }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-[#0048ff]/30">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
          {title.toUpperCase().replace(/ /g, '_')}
        </p>
        <div className="h-1.5 w-1.5 rounded-full bg-[#0048ff]/30 group-hover:bg-[#0048ff] transition-colors shadow-[0_0_8px_rgba(0,72,255,0.3)] group-hover:shadow-[0_0_12px_rgba(0,72,255,0.6)]" />
      </div>
      
      {error ? (
        <div className="mt-2">
          <p className="font-mono text-[10px] uppercase text-rose-500/80">ERR_SIGNAL_LOST</p>
          <div className="h-[1px] w-full bg-rose-500/10 my-2" />
          <p className="font-mono text-[9px] text-white/30 uppercase">Data_Corrupted</p>
        </div>
      ) : (
        <div className="flex items-baseline gap-2">
          <p className="font-mono text-4xl font-light tracking-tighter text-white">
            {typeof value === 'number' ? value.toString().padStart(2, '0') : value}
          </p>
          {trend && (
            <span className="font-mono text-[10px] text-[#0048ff]/40 uppercase">
              {trend}
            </span>
          )}
        </div>
      )}

      {/* Technical metadata footer */}
      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[#0048ff]/20" />
          <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">
            Status: Active
          </span>
        </div>
        <span className="font-mono text-[8px] text-white/20 uppercase">
          0x{Math.random().toString(16).substring(2, 6).toUpperCase()}
        </span>
      </div>
    </div>
  );
}
