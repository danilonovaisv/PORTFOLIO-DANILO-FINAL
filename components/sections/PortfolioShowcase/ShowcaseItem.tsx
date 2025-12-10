import Link from 'next/link';
import type { ActiveItem, Category } from './index';

const accentColor = '#2f5aff';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2f5aff] focus-visible:ring-offset-[#f7f8fb]';

type ShowcaseItemProps = {
  category: Category;
  hasActive: boolean;
  isActive: boolean;
  reduceMotion?: boolean;
  onActivate: (_active: ActiveItem) => void;
  onDeactivate: () => void;
};

const ShowcaseItem = ({
  category,
  hasActive,
  isActive,
  reduceMotion,
  onActivate,
  onDeactivate,
}: ShowcaseItemProps) => {
  const baseOpacity =
    hasActive && !isActive ? 'opacity-30 blur-[1px]' : 'opacity-100';
  const translateClass = reduceMotion ? '' : 'group-hover:translate-x-2';

  const accentShadow = reduceMotion
    ? undefined
    : '0 0 0 12px rgba(47,90,255,0.12)';

  return (
    <Link
      href={category.href}
      className={`group relative flex items-center justify-between gap-6 px-6 py-10 text-left transition-colors duration-300 md:px-10 md:py-14 ${baseOpacity} ${focusRing}`}
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
      <p
        className={`max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight text-neutral-900 transition-transform duration-300 md:text-5xl ${translateClass}`}
      >
        {category.label}
      </p>

      <div className="flex items-center gap-4 pr-2 md:pr-4">
        <span className="sr-only">{category.labelPT || category.label}</span>
        <span
          style={{ backgroundColor: accentColor, boxShadow: accentShadow }}
          className={`inline-flex h-3 w-3 items-center justify-center rounded-full transition-transform duration-300 md:h-[14px] md:w-[14px] ${
            reduceMotion ? '' : 'group-hover:scale-110'
          }`}
        />
      </div>

      <span className="pointer-events-none absolute inset-0 -z-10 bg-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};

export default ShowcaseItem;
