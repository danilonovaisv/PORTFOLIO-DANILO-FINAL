'use client';

import { useFormContext } from 'react-hook-form';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import { CaseBodyRenderer } from '@/components/portfolio/CaseBodyRenderer';
import type { ProjectFormValues } from '@/lib/admin/schemas/project';

export function MarkdownCaseSection() {
  const { register, watch } = useFormContext<ProjectFormValues>();
  const caseBody = watch('case_body') ?? '';

  return (
    <div className="p-6 bg-bluePrimary/[0.02] border border-white/5 rounded-md space-y-6 md:col-span-2">
      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-bluePrimary">
        System_Case_Structure_Nav
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <FieldTooltip
            label="System_Destination_Type"
            description="Define how the project is accessed: standard modal, dynamic landing page, or external link."
            className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
          />
          <select
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...register('destination.type')}
          >
            <option value="modal">System_Modal_Default</option>
            <option value="internal_landing">System_Landing_Dynamic</option>
            <option value="external_url">System_External_Node</option>
            <option value="page">System_Direct_Route</option>
          </select>
        </label>

        {(watch('destination.type') === 'external_url' ||
          watch('destination.type') === 'page') && (
          <label className="flex flex-col gap-2">
            <FieldTooltip
              label="System_Destination_URL"
              description="Full link to external destination or internal route."
              className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
            />
            <input
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
              {...register('destination.url')}
              placeholder="https://... ou /rota"
            />
          </label>
        )}
      </div>

      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Case_Markdown"
          description="Long-form narrative describing process, challenges, and results."
          className="flex items-center gap-1 font-mono text-[10px] text-white/60 uppercase tracking-widest"
        />
        <textarea
          rows={12}
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors resize-y"
          {...register('case_body')}
          placeholder="Write project narrative using Markdown..."
        />
        <p className="font-mono text-[9px] text-white/20 uppercase tracking-tight">
          Kernel_Hint: Use Copy Agent to synthesize narrative from project
          metrics.
        </p>
      </label>

      <div className="rounded border border-white/5 bg-black/20 p-6">
        <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
          Preview Markdown
        </p>
        {caseBody.trim() ? (
          <CaseBodyRenderer
            content={caseBody}
            className="prose-sm md:prose-base"
          />
        ) : (
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            System_Preview_Standby: Awaiting markdown input stream...
          </p>
        )}
      </div>
    </div>
  );
}
