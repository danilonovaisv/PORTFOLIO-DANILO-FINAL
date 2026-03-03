'use client';

import Image from 'next/image';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';

const getYoutubeId = (url: string) => {
  const match = url.match(
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/
  );
  return match && match[2].length === 11 ? match[2] : null;
};

const inputClasses =
  'w-full rounded-sm border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500';
const labelClasses =
  'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400';

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
  onChange: (_next: MediaAsset) => void;
  requireAlt?: boolean;
}

export function MediaAssetField({
  label,
  value,
  onChange,
  requireAlt = false,
}: MediaAssetFieldProps) {
  const isVideo = value.kind === 'video';
  const preview = value.previewUrl || value.src;
  const missingAlt = requireAlt && !isVideo && !value.alt?.trim();
  const youtubeId = preview ? getYoutubeId(preview) : null;

  return (
    <div className="space-y-3">
      <p className={labelClasses}>{label}</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className={labelClasses}>Tipo</span>
          <select
            aria-label="Tipo de Asset"
            className={inputClasses}
            value={value.kind || 'image'}
            onChange={(event) =>
              onChange({
                ...value,
                kind: event.target.value === 'video' ? 'video' : 'image',
              })
            }
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>Upload</span>
          <input
            className={`${inputClasses} file:mr-3 file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
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
      </div>

      <label className="space-y-1">
        <span className={labelClasses}>URL / Caminho</span>
        <input
          className={inputClasses}
          placeholder={
            isVideo
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
        <span className={labelClasses}>Texto alternativo</span>
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
          <span className={labelClasses}>Poster (opcional)</span>
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
          {isVideo ? (
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
