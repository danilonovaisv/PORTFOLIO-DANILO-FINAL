'use client';

import { useFormContext } from 'react-hook-form';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import { MarkdownCaseSection } from './MarkdownCaseSection';
import { PROJECT_TYPE_OPTIONS, type ProjectFormValues } from '@/lib/admin/schemas/project';
import type { DbTag } from '@/types/admin';

interface ProjectBasicDetailsSectionProps {
  availableTags: DbTag[];
}

export function ProjectBasicDetailsSection({
  availableTags,
}: ProjectBasicDetailsSectionProps) {
  const { register, setValue } = useFormContext<ProjectFormValues>();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Title"
          description="Public name of the project displayed in the portfolio and home view."
          className="flex items-center gap-1"
        />
        <input
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('title')}
        />
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Slug"
          description="Unique URL identifier. Use hyphens instead of spaces."
          className="flex items-center gap-1"
        />
        <div className="flex flex-col gap-2">
          {availableTags.length > 0 && (
            <select
              className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm text-white/80 font-mono focus:border-bluePrimary/50 outline-none transition-colors"
              defaultValue=""
              onChange={(event) => {
                const selectedSlug = event.target.value;
                if (selectedSlug) {
                  setValue('slug', selectedSlug);
                }
              }}
            >
              <option value="">SYSTEM_SELECT_TAG_SLUG</option>
              {availableTags.map((tag) => (
                <option key={tag.id} value={tag.slug}>
                  {tag.label} — {tag.slug}
                </option>
              ))}
            </select>
          )}
          <input
            className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
            {...register('slug')}
          />
        </div>
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Client"
          description="Brand or company name linked to the project."
          className="flex items-center gap-1"
        />
        <input
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('client_name')}
        />
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Brand"
          description="Optional. Use when the final brand differs from the direct client."
          className="flex items-center gap-1"
        />
        <input
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('brand_name')}
        />
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Year"
          description="Primary year of publication."
          className="flex items-center gap-1"
        />
        <input
          type="number"
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('year')}
        />
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Project_Type"
          description="Primary category for filters and editorial grid display."
          className="flex items-center gap-1"
        />
        <select
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('project_type')}
        >
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <FieldTooltip
          label="System_Short_Label"
          description="Short subtitle for cards and quick context."
          className="flex items-center gap-1"
        />
        <input
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
          {...register('short_label')}
        />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <FieldTooltip
          label="System_Description"
          description="Editorial summary of the case for modal and internal pages."
          className="flex items-center gap-1"
        />
        <textarea
          rows={4}
          className="w-full rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors resize-none"
          {...register('description')}
        />
      </label>

      <MarkdownCaseSection />
    </div>
  );
}
