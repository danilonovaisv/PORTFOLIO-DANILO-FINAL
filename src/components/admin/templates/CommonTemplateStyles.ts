export const inputClasses =
  'w-full rounded-sm border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500';

export const labelClasses =
  'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400';

export const splitTokenList = (value: string): string[] =>
  value
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export const splitLines = (value: string): string[] =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
