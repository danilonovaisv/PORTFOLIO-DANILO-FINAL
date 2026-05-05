export const inputClasses =
  'w-full rounded-sm border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-white outline-none transition-all placeholder:text-white/20 focus-visible:border-bluePrimary/50 focus-visible:ring-1 focus-visible:ring-bluePrimary/20';

export const labelClasses =
  'mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40';

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

export const splitBlocks = (value: string): string[] =>
  value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
