'use client';

import { LandingPageBlock, TextConfig } from '@/types/landing-page';
import { MediaAssetField } from '@/components/admin/templates/MediaAssetField';
import {
  inputClasses,
  labelClasses,
} from '@/components/admin/templates/CommonTemplateStyles';

interface BlockEditorV3Props {
  block: LandingPageBlock;
  onChange: (_updates: Partial<LandingPageBlock>) => void;
}

const FONT_SIZE_OPTIONS = [
  { value: '', label: 'SYSTEM_DEFAULT' },
  { value: 'text-base', label: 'NORMAL_BASE' },
  { value: 'text-lg', label: 'LARGE_LG' },
  { value: 'text-xl', label: 'EXTRA_LARGE_XL' },
  { value: 'text-2xl', label: '2XL' },
  { value: 'text-3xl', label: '3XL' },
];

const FONT_WEIGHT_OPTIONS = [
  { value: '', label: 'SYSTEM_DEFAULT' },
  { value: 'font-light', label: 'Light' },
  { value: 'font-normal', label: 'Normal' },
  { value: 'font-medium', label: 'Medium' },
  { value: 'font-semibold', label: 'Semibold' },
  { value: 'font-bold', label: 'Bold' },
];

const ALIGN_OPTIONS = [
  { value: '', label: 'AUTO' },
  { value: 'left', label: 'LEFT' },
  { value: 'center', label: 'CENTER' },
  { value: 'right', label: 'RIGHT' },
  { value: 'justify', label: 'JUSTIFIED' },
] as const;

function TextConfigPanel({
  config,
  onChange,
  label,
}: {
  config?: TextConfig;
  onChange: (_next: TextConfig) => void;
  label: string;
}) {
  const value = config || {};
  const update = (patch: Partial<TextConfig>) =>
    onChange({ ...value, ...patch });

  return (
    <details className="rounded border border-white/5 bg-white/[0.02]">
      <summary className="cursor-pointer px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors hover:text-white/70">
        System_Formatting_Node: {label}
      </summary>
      <div className="grid grid-cols-2 gap-3 px-3 pb-3 pt-1 sm:grid-cols-4">
        <label className="space-y-1">
          <span className={labelClasses}>FONT_SIZE_TOKEN</span>
          <select
            className={inputClasses}
            value={value.fontSize || ''}
            onChange={(e) => update({ fontSize: e.target.value || undefined })}
          >
            {FONT_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>FONT_WEIGHT_TOKEN</span>
          <select
            className={inputClasses}
            value={value.fontWeight || ''}
            onChange={(e) =>
              update({ fontWeight: e.target.value || undefined })
            }
          >
            {FONT_WEIGHT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>TEXT_ALIGN_TOKEN</span>
          <select
            className={inputClasses}
            value={value.textAlign || ''}
            onChange={(e) =>
              update({
                textAlign: (e.target.value ||
                  undefined) as TextConfig['textAlign'],
              })
            }
          >
            {ALIGN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>COLOR_HEX_TOKEN</span>
          <div className="flex gap-1">
            <input
              type="color"
              className="h-9 w-10 border border-white/5 bg-transparent"
              value={value.color || '#ffffff'}
              onChange={(e) => update({ color: e.target.value })}
              title="System_Color_Picker"
            />
            <input
              className={inputClasses}
              value={value.color || ''}
              onChange={(e) => update({ color: e.target.value || undefined })}
              placeholder="#ffffff"
            />
          </div>
        </label>
      </div>
    </details>
  );
}

export function BlockEditorV3({ block, onChange }: BlockEditorV3Props) {
  const updateContent = (updates: Record<string, unknown>) => {
    onChange({
      content: {
        ...block.content,
        ...updates,
      },
    });
  };

  const renderMediaField = (
    label: string,
    options?: { secondary?: boolean; tertiary?: boolean; kind?: 'image' | 'video' | 'youtube' }
  ) => {
    const slotNum = options?.tertiary ? '3' : options?.secondary ? '2' : '';
    const mediaKey = slotNum ? `media${slotNum}` : 'media';
    const altKey = slotNum ? `alt${slotNum}` : 'alt';
    const posterKey = slotNum ? `poster${slotNum}` : 'poster';
    const mediaTypeKey = slotNum ? `mediaType${slotNum}` : 'mediaType';
    const fileKey = slotNum ? `file${slotNum}` : 'file';
    const previewKey = slotNum ? `previewUrl${slotNum}` : 'previewUrl';
    const kind =
      options?.kind ??
      (block.content[mediaTypeKey] === 'youtube'
        ? 'youtube'
        : block.content[mediaTypeKey] === 'video'
          ? 'video'
          : 'image');

    const value = {
      src: block.content[mediaKey] || '',
      alt: block.content[altKey] || '',
      kind: kind === 'youtube' ? 'video' : kind,
      poster: block.content[posterKey] || '',
      file: (block as Record<string, any>)[fileKey] || null,
      previewUrl: (block as Record<string, any>)[previewKey] || '',
    };

    return (
      <MediaAssetField
        label={label}
        value={value}
        mode={kind}
        allowYouTube
        onChange={(next, nextMode = kind) => {
          onChange({
            [fileKey]: next.file ?? null,
            [previewKey]: next.previewUrl || '',
            content: {
              ...block.content,
              [mediaKey]: next.src,
              [altKey]: next.alt,
              [posterKey]: next.poster,
              [mediaTypeKey]:
                nextMode === 'youtube'
                  ? 'youtube'
                  : nextMode === 'video'
                    ? 'video'
                    : 'image',
            },
          });
        }}
        requireAlt={kind === 'image'}
      />
    );
  };

  /**
   * renderPolymorphicSlot — slot de mídia livre com seletor de tipo (image | video | html)
   * Utilizado pelos tipos media-1x, media-2x e media-3x.
   */
  const renderPolymorphicSlot = (slotIndex: 1 | 2 | 3) => {
    const slotSuffix = slotIndex === 1 ? '' : String(slotIndex);
    const mediaTypeKey = slotSuffix ? `mediaType${slotSuffix}` : 'mediaType';
    const htmlKey = slotSuffix ? `html${slotSuffix}` : 'html';
    const currentType: string = block.content[mediaTypeKey] || 'image';
    const label = `SLOT_${slotIndex.toString().padStart(2, '0')}`;

    return (
      <div key={`slot-${slotIndex}`} className="space-y-3 rounded border border-white/5 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between">
          <span className={labelClasses}>{label}_TYPE</span>
          <select
            className="rounded border border-white/10 bg-black/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70 outline-none"
            value={currentType}
            onChange={(e) => updateContent({ [mediaTypeKey]: e.target.value })}
            aria-label={`${label} media type`}
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="html">HTML</option>
          </select>
        </div>

        {currentType === 'html' ? (
          <div className="space-y-2">
            <label className="block space-y-1">
              <span className={labelClasses}>{label}_HTML_MARKUP</span>
              <textarea
                className={`${inputClasses} min-h-40 font-mono text-xs`}
                value={block.content[htmlKey] || ''}
                onChange={(e) => updateContent({ [htmlKey]: e.target.value })}
                placeholder="<!-- HTML embed, iframe, ou código interativo -->"
              />
              <span className="block text-[10px] text-white/30">
                Protocol: Full HTML5, scripts e estilos suportados (sandbox).
              </span>
            </label>
          </div>
        ) : (
          renderMediaField(`${label}_MEDIA`, {
            secondary: slotIndex === 2,
            tertiary: slotIndex === 3,
            kind: currentType === 'video' ? 'video' : 'image',
          })
        )}
      </div>
    );
  };

  const renderTextField = (
    label: string,
    fieldKey: 'text' | 'text2' = 'text',
    configKey: 'textConfig' | 'textConfig2' = 'textConfig'
  ) => (
    <div className="space-y-2">
      <label className="block space-y-1">
        <span className={labelClasses}>{label}</span>
        <textarea
          className={`${inputClasses} min-h-40 font-mono text-sm`}
          value={block.content[fieldKey] || ''}
          onChange={(e) => updateContent({ [fieldKey]: e.target.value })}
          placeholder="System_Markdown_Supported: **bold**, *italic*, # H1, - List, > Quote"
        />
        <span className="block text-[10px] text-white/30">
          Status: System_Markdown_Protocol_Enabled
        </span>
      </label>
      <TextConfigPanel
        label={label}
        config={block.content[configKey] as TextConfig | undefined}
        onChange={(next) => updateContent({ [configKey]: next })}
      />
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      {block.type === 'text' ? renderTextField('TEXT_NODE') : null}

      {block.type === 'quote-band' ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center space-y-6">
          <label className="block w-full space-y-1">
            <span className={labelClasses}>QUOTE_NODE</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center`}
              value={block.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </label>

          <label className="block w-full space-y-1">
            <span className={labelClasses}>SUPPORT_TEXT (OPTIONAL)</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center`}
              value={block.content.text2 || ''}
              onChange={(e) => updateContent({ text2: e.target.value })}
            />
          </label>

          <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2">
            <span className={labelClasses}>BAND_COLOR_TOKEN</span>
            <div className="flex w-full gap-2">
              <input
                type="color"
                className="h-10 w-12 border border-white/5 bg-transparent"
                value={block.content.bandColor || '#0048ff'}
                onChange={(e) => updateContent({ bandColor: e.target.value })}
                title="System_Band_Color_Picker"
              />
              <input
                className={inputClasses}
                value={block.content.bandColor || '#0048ff'}
                onChange={(e) => updateContent({ bandColor: e.target.value })}
                title="HEX_VALUE_PROTOCOL"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      ) : null}

      {block.type === 'image' &&
        renderMediaField('FULL_IMAGE_ASSET', { kind: 'image' })}

      {(block.type === 'video' || block.type === 'video-autoplay') &&
        renderMediaField(
          block.type === 'video-autoplay'
            ? 'AUTOPLAY_VIDEO_NODE'
            : 'FULL_VIDEO_ASSET',
          { kind: 'video' }
        )}

      {block.type === 'html-video' && (
        <div className="space-y-4">
          {renderMediaField('TRACK_IMAGE_OR_MEDIA_ASSET (OPTIONAL)', { kind: 'image' })}

          <label className="block space-y-1">
            <span className={labelClasses}>HTML_VIDEO_MARKUP / CUSTOM_HTML_PREVIEW</span>
            <textarea
              className={`${inputClasses} min-h-60 font-mono text-xs`}
              value={block.content.html || ''}
              onChange={(e) => updateContent({ html: e.target.value })}
              placeholder="<!-- Insert custom HTML video, iframe embed, or scroll preview markup here -->"
            />
            <span className="block text-[10px] text-white/40">
              Protocol: Full HTML5, inline scripts, styles & custom video embeds supported.
            </span>
          </label>
        </div>
      )}

      {(block.type === 'image-text' ||
        block.type === 'text-image' ||
        block.type === 'video-text') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField(
            block.type === 'video-text'
              ? 'MEDIA_ASSET_VIDEO'
              : 'MEDIA_ASSET_IMAGE',
            { kind: block.type === 'video-text' ? 'video' : 'image' }
          )}
          {renderTextField('TEXT_CONTENT')}
        </div>
      )}

      {(block.type === 'image-image' || block.type === 'image-video') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField('PRIMARY_MEDIA_NODE', { kind: 'image' })}
          {renderMediaField(
            block.type === 'image-video'
              ? 'SECONDARY_MEDIA_VIDEO'
              : 'SECONDARY_MEDIA_IMAGE',
            {
              secondary: true,
              kind: block.type === 'image-video' ? 'video' : 'image',
            }
          )}
        </div>
      )}

      {/* ── Composições polimórficas (media-1x / media-2x / media-3x) ── */}
      {block.type === 'media-1x' && (
        <div className="space-y-3">
          {renderPolymorphicSlot(1)}
        </div>
      )}

      {block.type === 'media-2x' && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderPolymorphicSlot(1)}
          {renderPolymorphicSlot(2)}
        </div>
      )}

      {block.type === 'media-3x' && (
        <div className="grid gap-4 md:grid-cols-3">
          {renderPolymorphicSlot(1)}
          {renderPolymorphicSlot(2)}
          {renderPolymorphicSlot(3)}
        </div>
      )}
    </div>
  );
}
