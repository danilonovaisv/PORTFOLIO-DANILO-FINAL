import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ActiveItem, Category } from './index';

type ShowcaseItemProps = {
  category: Category;
  index: number;
  hasActive: boolean;
  isActive: boolean;
  reduceMotion?: boolean;
  onActivate: (_active: ActiveItem) => void;
  onDeactivate: () => void;
};

const ShowcaseItem = ({
  category,
  index,
  hasActive,
  isActive,
  reduceMotion,
  onActivate,
  onDeactivate,
}: ShowcaseItemProps) => {
  const baseOpacity =
    hasActive && !isActive ? 'opacity-30 blur-[1px]' : 'opacity-100';
  const translateClass = reduceMotion ? '' : 'group-hover:translate-x-2';

  return (
    <Link
      href={category.href}
      className={`group relative flex items-center justify-between gap-6 border-t border-black/10 px-2 py-10 transition-colors duration-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF] ${baseOpacity}`}
      onMouseEnter={() =>
        onActivate({
          id: category.id,
          label: category.label,
          src: category.src,
        })
      }
      onMouseLeave={onDeactivate}
      onFocus={() =>
        onActivate({
          id: category.id,
          label: category.label,
          src: category.src,
        })
      }
      onBlur={onDeactivate}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.28em] text-neutral-500">
          <span
            className="inline-flex h-2 w-2 items-center justify-center rounded-full bg-[#0057FF]"
            aria-hidden
          />
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <p
          className={`text-3xl font-semibold uppercase leading-tight tracking-tight text-neutral-900 md:text-5xl ${translateClass} transition-transform duration-300`}
        >
          {category.label}
        </p>
        <p className="text-sm font-mono text-neutral-500">{category.labelPT}</p>
      </div>

      <div className="flex items-center gap-4 text-[#0057FF]">
        <span className="hidden text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 md:inline">
          explore
        </span>
        <span
          className={`h-3 w-3 rounded-full bg-[#0057FF] ${reduceMotion ? '' : 'shadow-[0_0_0_8px_rgba(0,87,255,0.12)]'}`}
        />
        <ArrowUpRight className="h-6 w-6 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <span className="pointer-events-none absolute inset-0 -z-10 bg-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};

export default ShowcaseItem;
