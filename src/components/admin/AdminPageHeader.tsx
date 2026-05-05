import { ReactNode } from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'default';
  };
  breadcrumbs?: Breadcrumb[];
  action?: ReactNode;
  className?: string;
}

export function AdminPageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs,
  action,
  className = '',
}: AdminPageHeaderProps) {
  const badgeColors = {
    indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    rose: 'border-rose-500/30 bg-rose-500/10 text-rose-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    default: 'border-white/10 bg-white/5 text-white/60',
  };

  return (
    <header className={`mb-10 space-y-6 ${className}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-bluePrimary/40" />
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bluePrimary/60">
              {breadcrumbs ? (
                breadcrumbs.map((crumb, idx) => (
                  <span key={crumb.label} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-bluePrimary transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {idx < breadcrumbs.length - 1 && (
                      <span className="text-white/10">/</span>
                    )}
                  </span>
                ))
              ) : (
                <span>System_Module</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-mono text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl">
              {title.split(' ').map((word, i) => (
                <span key={i}>
                  {word}
                  {i === title.split(' ').length - 1 ? (
                    <span className="text-bluePrimary">.</span>
                  ) : (
                    <span className="text-bluePrimary/40">_</span>
                  )}
                </span>
              ))}
            </h1>

            {badge && (
              <div
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                  badgeColors[badge.color || 'default']
                }`}
              >
                {badge.text}
              </div>
            )}
          </div>

          {subtitle && (
            <p className="max-w-2xl font-mono text-[11px] uppercase tracking-wider text-white/40">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="flex shrink-0 items-center gap-3">{action}</div>
        )}
      </div>
    </header>
  );
}
