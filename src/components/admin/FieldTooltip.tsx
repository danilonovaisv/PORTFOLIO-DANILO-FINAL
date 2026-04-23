'use client';

import { HelpCircle } from 'lucide-react';
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
      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <TooltipProvider delayDuration={120}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`SYSTEM_HELP: ${label.toUpperCase()}`}
              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-white/30 transition-colors hover:text-[#0048ff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0048ff]/50"
            >
              <HelpCircle size={12} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-72 border border-white/10 bg-black/80 backdrop-blur-xl text-[10px] font-mono leading-relaxed text-white/70 rounded-none shadow-2xl"
          >
            {description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
