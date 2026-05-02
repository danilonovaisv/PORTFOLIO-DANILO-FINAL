'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  version?: string;
  status?: 'synced' | 'pending' | 'error' | 'none';
  actions?: ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export function AdminHeader({
  title,
  subtitle,
  category = 'System_Main_Frame',
  version = 'v3.0.0',
  status = 'synced',
  actions,
  breadcrumbs,
}: AdminHeaderProps) {
  return (
    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-[#0048ff]/40" />
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0048ff]/60">
            {breadcrumbs ? (
              breadcrumbs.map((crumb, idx) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[#0048ff] transition-colors"
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
              <span>{category}</span>
            )}
          </div>
        </div>
        <h1 className="font-mono text-4xl md:text-5xl font-light tracking-tight text-white uppercase">
          {title.split('_').map((word, i) => (
            <span key={i}>
              {word}
              {i < title.split('_').length - 1 && (
                <span className="text-[#0048ff]">_</span>
              )}
            </span>
          ))}
          <span className="text-[#0048ff]">.</span>
        </h1>
        {subtitle ? (
          <p className="max-w-md text-sm text-white/40 leading-relaxed font-light">
            {subtitle}
          </p>
        ) : (
          <div className="flex items-center gap-6 font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <span>Module: {title.replace(/_/g, ' ')}</span>
            <span>Security: High_Priority</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
            Module_Version
          </span>
          <span className="font-mono text-[10px] text-white/40">{version}</span>
        </div>
        <div className="h-10 w-[1px] bg-white/5" />
        
        {status !== 'none' && (
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
              Status
            </span>
            <div className="flex items-center gap-2">
              <span 
                className={`h-1.5 w-1.5 rounded-full ${
                  status === 'synced' ? 'bg-emerald-500 animate-pulse' :
                  status === 'pending' ? 'bg-amber-500 animate-pulse' :
                  'bg-rose-500'
                }`} 
              />
              <span className="font-mono text-[10px] text-white/40 uppercase">
                {status}
              </span>
            </div>
          </div>
        )}

        {actions && (
          <>
            <div className="h-10 w-[1px] bg-white/5" />
            <div className="flex items-center gap-3">
              {actions}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
