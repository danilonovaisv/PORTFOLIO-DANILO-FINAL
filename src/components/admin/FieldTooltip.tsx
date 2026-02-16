'use client';

import { CircleHelp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type FieldTooltipProps = {
  label: string;
  description: string;
  className?: string;
};

export function FieldTooltip({
  label,
  description,
  className,
}: FieldTooltipProps) {
  return (
    <div className={className}>
      <span className="text-sm text-slate-300">{label}</span>
      <TooltipProvider delayDuration={120}>
        <Tooltip>
          <TooltipTrigger
            asChild
            aria-label={`Ajuda sobre ${label.toLowerCase()}`}
          >
            <button
              type="button"
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <CircleHelp size={14} aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-72 border-white/20 bg-slate-900 text-[11px] leading-relaxed text-slate-200"
          >
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
