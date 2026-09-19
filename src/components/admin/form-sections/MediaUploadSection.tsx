'use client';

import { FieldTooltip } from '@/components/admin/FieldTooltip';

export type CoverMediaMode = 'file' | 'html';

interface MediaUploadSectionProps {
  urlLandscape?: string | null;
  urlSquare?: string | null;
  landscapeMode?: CoverMediaMode;
  landscapeHtml?: string;
  squareMode?: CoverMediaMode;
  squareHtml?: string;
  onChangeLandscapeMode?: (_mode: CoverMediaMode) => void;
  onChangeLandscapeHtml?: (_html: string) => void;
  onChangeSquareMode?: (_mode: CoverMediaMode) => void;
  onChangeSquareHtml?: (_html: string) => void;
  onChangeLandscapeFile: (_file: File | null) => void;
  onChangeSquareFile: (_file: File | null) => void;
}

export function MediaUploadSection({
  urlLandscape,
  urlSquare,
  landscapeMode = 'file',
  landscapeHtml = '',
  squareMode = 'file',
  squareHtml = '',
  onChangeLandscapeMode,
  onChangeLandscapeHtml,
  onChangeSquareMode,
  onChangeSquareHtml,
  onChangeLandscapeFile,
  onChangeSquareFile,
}: MediaUploadSectionProps) {
  const isLandscapeHtmlStored = Boolean(
    urlLandscape &&
    (urlLandscape.trim().startsWith('<') ||
      urlLandscape.includes('<iframe') ||
      urlLandscape.includes('<video'))
  );

  const isSquareHtmlStored = Boolean(
    urlSquare &&
    (urlSquare.trim().startsWith('<') ||
      urlSquare.includes('<iframe') ||
      urlSquare.includes('<video'))
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* SYSTEM_COVER_16X9 */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <FieldTooltip
            label="System_Cover_16x9"
            description="Landscape cover used for hero/full-highlight and wide containers."
            className="flex items-center gap-1"
          />
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded p-0.5 text-[9px] font-mono font-bold tracking-wider">
            <button
              type="button"
              onClick={() => onChangeLandscapeMode?.('file')}
              className={`px-2 py-1 rounded transition-colors ${
                landscapeMode === 'file'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              FILE / IMAGE
            </button>
            <button
              type="button"
              onClick={() => onChangeLandscapeMode?.('html')}
              className={`px-2 py-1 rounded transition-colors ${
                landscapeMode === 'html'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              HTML VIDEO
            </button>
          </div>
        </div>

        {landscapeMode === 'html' ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={landscapeHtml}
              onChange={(e) => onChangeLandscapeHtml?.(e.target.value)}
              placeholder="Cole o código HTML do vídeo (ex: <video src=... autoplay loop muted></video> ou <iframe>)"
              rows={3}
              className="w-full rounded border border-white/10 bg-black/40 p-2.5 font-mono text-[11px] text-white/90 placeholder:text-white/20 focus:border-bluePrimary focus:outline-none"
            />
            {isLandscapeHtmlStored && (
              <span className="font-mono text-[9px] text-blueAccent/60 break-all uppercase">
                ACTIVE_HTML_SNIPPET: {urlLandscape?.slice(0, 100)}...
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
              accept="image/*,video/*"
              onChange={(e) =>
                onChangeLandscapeFile(e.target.files?.[0] ?? null)
              }
            />
            {urlLandscape && !isLandscapeHtmlStored && (
              <span className="font-mono text-[9px] text-white/20 break-all uppercase">
                Current_Blob: {urlLandscape}
              </span>
            )}
          </div>
        )}
      </div>

      {/* SYSTEM_COVER_1X1 */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <FieldTooltip
            label="System_Cover_1x1"
            description="Square cover for compact cards and dense grids."
            className="flex items-center gap-1"
          />
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded p-0.5 text-[9px] font-mono font-bold tracking-wider">
            <button
              type="button"
              onClick={() => onChangeSquareMode?.('file')}
              className={`px-2 py-1 rounded transition-colors ${
                squareMode === 'file'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              FILE / IMAGE
            </button>
            <button
              type="button"
              onClick={() => onChangeSquareMode?.('html')}
              className={`px-2 py-1 rounded transition-colors ${
                squareMode === 'html'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              HTML VIDEO
            </button>
          </div>
        </div>

        {squareMode === 'html' ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={squareHtml}
              onChange={(e) => onChangeSquareHtml?.(e.target.value)}
              placeholder="Cole o código HTML do vídeo (ex: <video src=... autoplay loop muted></video> ou <iframe>)"
              rows={3}
              className="w-full rounded border border-white/10 bg-black/40 p-2.5 font-mono text-[11px] text-white/90 placeholder:text-white/20 focus:border-bluePrimary focus:outline-none"
            />
            {isSquareHtmlStored && (
              <span className="font-mono text-[9px] text-blueAccent/60 break-all uppercase">
                ACTIVE_HTML_SNIPPET: {urlSquare?.slice(0, 100)}...
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              className="w-full text-[11px] text-white/40 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-bluePrimary/10 file:text-bluePrimary hover:file:bg-bluePrimary/20 transition-colors cursor-pointer"
              accept="image/*,video/*"
              onChange={(e) => onChangeSquareFile(e.target.files?.[0] ?? null)}
            />
            {urlSquare && !isSquareHtmlStored && (
              <span className="font-mono text-[9px] text-white/20 break-all uppercase">
                Current_Blob: {urlSquare}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
