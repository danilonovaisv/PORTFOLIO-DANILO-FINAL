'use client';

import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';

interface TemplateBadgeProps {
  template?: string;
  className?: string;
}

export function TemplateBadge({
  template,
  className = '',
}: TemplateBadgeProps) {
  if (!template) {
    return (
      <span
        className={`font-mono text-[9px] text-white/20 uppercase tracking-widest ${className}`}
      >
        NONE
      </span>
    );
  }

  const isModern =
    template === MASTER_PROJECT_TEMPLATE ||
    template === MASTER_PROJECT_TEMPLATE_V2 ||
    template === MASTER_PROJECT_TEMPLATE_V3;

  const isV3 = template === MASTER_PROJECT_TEMPLATE_V3;

  // Cleanup label: master-project-v3-alpa -> V3_ALPA
  const label = template
    .replace('master-project-', '')
    .replace(/-/g, '_')
    .toUpperCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border transition-all ${
        isModern
          ? 'bg-[#0048ff]/10 text-[#0048ff] border-[#0048ff]/20'
          : 'bg-white/5 text-white/40 border-white/5'
      } ${isV3 ? 'font-bold' : ''} ${className}`}
    >
      {label}
    </span>
  );
}
