'use client';

import Image from 'next/image';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';
import { extractYouTubeId } from '@/lib/utils';
import { inputClasses, labelClasses } from './CommonTemplateStyles';


interface MediaAsset {
  src: string;
  alt?: string;
  kind?: 'image' | 'video';
  poster?: string;
  file?: File | null;
  previewUrl?: string;
}

interface MediaAssetFieldProps {
  label: string;
  value: MediaAsset;
  onChange: (_next: MediaAsset, _mode?: 'image' | 'video' | 'youtube') => void;
  requireAlt?: boolean;
  mode?: 'image' | 'video' | 'youtube';
  allowYouTube?: boolean;
}

export function MediaAssetField({
  label,
  value,
  onChange,
  requireAlt = false,
  mode,
  allowYouTube = false,
}: MediaAssetFieldProps) {
  const selectedMode = mode ?? (value.kind === 'video' ? 'video' : 'image');
  const isVideo = selectedMode === 'video';
  const isYoutube = selectedMode === 'youtube';
  const preview = value.previewUrl || value.src;
  const missingAlt = requireAlt && !isVideo && !isYoutube && !value.alt?.trim();
  const youtubeId = preview ? extractYouTubeId(preview) : null;

  return (
    <div className="space-y-3">
      <p className={labelClasses}>{label}</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className={labelClasses}>System_Type</span>
          <select
            aria-label="Asset Type"
            className={inputClasses}
            value={selectedMode}
            onChange={(event) =>
              onChange(
                {
                  ...value,
                  kind: event.target.value === 'image' ? 'image' : 'video',
                  file: event.target.value === 'youtube' ? null : value.file,
                  previewUrl:
                    event.target.value === 'youtube' ? '' : value.previewUrl,
                  poster: event.target.value === 'youtube' ? '' : value.poster,
                },
                event.target.value as 'image' | 'video' | 'youtube'
              )
            }
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            {allowYouTube ? <option value="youtube">YouTube</option> : null}
          </select>
        </label>

        {isYoutube ? (
          <div className="space-y-1">
            <span className={labelClasses}>Upload</span>
            <div
              className={`${inputClasses} flex min-h-10 items-center text-white/20`}
            >
              YouTube_Mode_Active: Source_URI_Required.
            </div>
          </div>
        ) : (
          <label className="space-y-1">
            <span className={labelClasses}>Asset_Stream</span>
            <input
              className={`${inputClasses} file:mr-3 file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:font-mono file:text-[9px] file:uppercase file:tracking-widest file:text-white hover:file:bg-blue-500 transition-all`}
              type="file"
              accept={isVideo ? 'video/*' : 'image/*'}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;

                onChange({
                  ...value,
                  file,
                  previewUrl: URL.createObjectURL(file),
                });
              }}
            />
          </label>
        )}
      </div>

      <label className="space-y-1">
        <span className={labelClasses}>Source_URI</span>
        <input
          className={inputClasses}
          placeholder={
            isYoutube
              ? 'https://www.youtube.com/watch?v=VIDEO_ID'
              : isVideo
                ? 'landing-pages/meu-projeto/hero-video.mp4'
                : 'landing-pages/meu-projeto/hero.webp'
          }
          value={value.src || ''}
          onChange={(event) =>
            onChange({
              ...value,
              src: event.target.value,
              file: null,
              previewUrl: '',
            })
          }
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>ALT_Metadata</span>
        <input
          className={inputClasses}
          value={value.alt || ''}
          onChange={(event) => onChange({ ...value, alt: event.target.value })}
        />
      </label>

      {missingAlt && (
        <p className="text-xs text-red-300">
          Alt text obrigatório para imagem.
        </p>
      )}

      {isVideo && (
        <label className="space-y-1">
          <span className={labelClasses}>POSTER_Asset</span>
          <input
            className={inputClasses}
            value={value.poster || ''}
            onChange={(event) =>
              onChange({ ...value, poster: event.target.value })
            }
          />
        </label>
      )}

      {preview && (
        <div className="relative h-56 w-full overflow-hidden border border-white/10 bg-black/40">
          {isYoutube && youtubeId ? (
            <YouTubePlayer
              videoId={youtubeId}
              className="h-56 w-full border-0"
            />
          ) : isVideo ? (
            youtubeId ? (
              <YouTubePlayer
                videoId={youtubeId}
                className="h-56 w-full border-0"
              />
            ) : (
              <video
                src={preview}
                className="h-56 w-full object-cover"
                controls
                playsInline
              />
            )
          ) : (
            <Image
              src={preview}
              alt={value.alt || 'Pré-visualização'}
              fill
              className="object-cover"
              unoptimized
            />
          )}
        </div>
      )}
    </div>
  );
}
