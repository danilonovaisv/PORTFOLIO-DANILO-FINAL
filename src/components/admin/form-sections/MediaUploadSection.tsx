'use client';

import { FieldTooltip } from '@/components/admin/FieldTooltip';

interface MediaUploadSectionProps {
  urlLandscape?: string | null;
  urlSquare?: string | null;
  onChangeLandscapeFile: (file: File | null) => void;
  onChangeSquareFile: (file: File | null) => void;
}

export function MediaUploadSection({
  urlLandscape,
  urlSquare,
  onChangeLandscapeFile,
  onChangeSquareFile,
}: MediaUploadSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Cover_16x9"
          description="Landscape cover used for hero/full-highlight and wide containers."
          className="flex items-center gap-1"
        />
        <input
          type="file"
          className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
          accept="image/*,video/*"
          onChange={(e) => onChangeLandscapeFile(e.target.files?.[0] ?? null)}
        />
        {urlLandscape && (
          <span className="font-mono text-[9px] text-white/20 break-all uppercase">
            Current_Blob: {urlLandscape}
          </span>
        )}
      </label>
      <label className="flex flex-col gap-2">
        <FieldTooltip
          label="System_Cover_1x1"
          description="Square cover for compact cards and dense grids."
          className="flex items-center gap-1"
        />
        <input
          type="file"
          className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
          accept="image/*,video/*"
          onChange={(e) => onChangeSquareFile(e.target.files?.[0] ?? null)}
        />
        {urlSquare && (
          <span className="font-mono text-[9px] text-white/20 break-all uppercase">
            Current_Blob: {urlSquare}
          </span>
        )}
      </label>
    </div>
  );
}
