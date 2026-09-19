'use client';

import Image from 'next/image';
import { YouTubePlayer } from '@/components/ui/YouTubePlayer';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';
import { extractYouTubeId } from '@/lib/utils';
import { isHtmlMedia } from '@/lib/portfolio/card-media';
import {
  normalizeYoutubeUrl,
  resolveLandingAsset,
} from '@/lib/media/asset-contract';
import { inputClasses, labelClasses } from './CommonTemplateStyles';

export interface MediaAsset {
  src: string;
  alt?: string;
  kind?: 'image' | 'video' | 'html';
  poster?: string;
  file?: File | null;
  previewUrl?: string;
}

export interface MediaAssetFieldProps {
  label: string;
  value: MediaAsset;
  onChange: (
    _next: MediaAsset,
    _mode?: 'image' | 'video' | 'youtube' | 'html'
  ) => void;
  requireAlt?: boolean;
  mode?: 'image' | 'video' | 'youtube' | 'html';
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
  const selectedMode =
    mode ??
    (value.kind === 'html' || isHtmlMedia(value.src)
      ? 'html'
      : value.kind === 'video'
        ? 'video'
        : 'image');
  const isVideo = selectedMode === 'video';
  const isYoutube = selectedMode === 'youtube';
  const isHtml = selectedMode === 'html';
  const preview = value.previewUrl || value.src;
  const missingAlt =
    requireAlt && !isVideo && !isYoutube && !isHtml && !value.alt?.trim();
  const youtubeId = preview ? extractYouTubeId(preview) : null;
  const sourceValidation =
    value.src && !value.file && !isHtml
      ? resolveLandingAsset(
          value.src,
          isYoutube ? 'youtube' : isVideo ? 'video' : 'image'
        )
      : null;
  const invalidSource = sourceValidation ? !sourceValidation.ok : false;
  const errorMessage = isYoutube
    ? 'SYSTEM_ERR: INVALID_YOUTUBE_URL'
    : 'SYSTEM_ERR: INVALID_ASSET_SOURCE';

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
            onChange={(event) => {
              const nextMode = event.target.value as
                'image' | 'video' | 'youtube' | 'html';
              const nextKind =
                nextMode === 'html'
                  ? 'html'
                  : nextMode === 'video'
                    ? 'video'
                    : 'image';
              onChange(
                {
                  ...value,
                  kind: nextKind,
                  file:
                    nextMode === 'youtube' || nextMode === 'html'
                      ? null
                      : value.file,
                  previewUrl:
                    nextMode === 'youtube' || nextMode === 'html'
                      ? ''
                      : value.previewUrl,
                  poster:
                    nextMode === 'youtube' || nextMode === 'html'
                      ? ''
                      : value.poster,
                },
                nextMode
              );
            }}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="html">HTML Video</option>
            {allowYouTube ? <option value="youtube">YouTube</option> : null}
          </select>
        </label>

        {isYoutube || isHtml ? (
          <div className="space-y-1">
            <span className={labelClasses}>Upload</span>
            <div
              className={`${inputClasses} flex min-h-10 items-center text-white/20`}
            >
              {isHtml
                ? 'HTML_Video_Mode_Active: Paste_Code_Below.'
                : 'YouTube_Mode_Active: Source_URI_Required.'}
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

      {isHtml ? (
        <label className="space-y-1 block">
          <span className={labelClasses}>HTML_Video_Code</span>
          <textarea
            className={`${inputClasses} min-h-32 font-mono text-xs leading-relaxed resize-y`}
            placeholder={`<!DOCTYPE html>\n<html lang="pt-BR">\n  <body>\n    <video src="..." autoplay loop muted playsinline></video>\n  </body>\n</html>`}
            value={value.src || ''}
            onChange={(event) => {
              onChange(
                {
                  ...value,
                  src: event.target.value,
                  kind: 'html',
                  file: null,
                  previewUrl: '',
                },
                'html'
              );
            }}
          />
        </label>
      ) : (
        <label className="space-y-1 block">
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
            aria-invalid={invalidSource}
            onChange={(event) => {
              const rawValue = event.target.value;
              const nextSrc = isYoutube
                ? normalizeYoutubeUrl(rawValue) || rawValue
                : rawValue;
              onChange({
                ...value,
                src: nextSrc,
                file: null,
                previewUrl: '',
              });
            }}
          />
        </label>
      )}

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
          Alt_Metadata_Required_For_Images.
        </p>
      )}

      {invalidSource && <p className="text-xs text-red-300">{errorMessage}</p>}

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
          {isHtml ? (
            <HTMLVideoBlock html={preview} frameless className="h-56 w-full" />
          ) : isYoutube && youtubeId ? (
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
              alt={value.alt || 'System_Preview'}
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
