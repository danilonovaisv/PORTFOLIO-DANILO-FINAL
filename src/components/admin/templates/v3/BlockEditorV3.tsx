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
  { value: '', label: 'Padrão' },
  { value: 'text-base', label: 'Normal (base)' },
  { value: 'text-lg', label: 'Grande (lg)' },
  { value: 'text-xl', label: 'Extra grande (xl)' },
  { value: 'text-2xl', label: '2XL' },
  { value: 'text-3xl', label: '3XL' },
];

const FONT_WEIGHT_OPTIONS = [
  { value: '', label: 'Padrão' },
  { value: 'font-light', label: 'Light' },
  { value: 'font-normal', label: 'Normal' },
  { value: 'font-medium', label: 'Medium' },
  { value: 'font-semibold', label: 'Semibold' },
  { value: 'font-bold', label: 'Bold' },
];

const ALIGN_OPTIONS = [
  { value: '', label: 'Auto' },
  { value: 'left', label: 'Esquerda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Direita' },
  { value: 'justify', label: 'Justificado' },
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
          <span className={labelClasses}>Tamanho</span>
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
          <span className={labelClasses}>Peso</span>
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
          <span className={labelClasses}>Alinhamento</span>
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
          <span className={labelClasses}>Cor</span>
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
    options?: { secondary?: boolean; kind?: 'image' | 'video' | 'youtube' }
  ) => {
    const mediaKey = options?.secondary ? 'media2' : 'media';
    const altKey = options?.secondary ? 'alt2' : 'alt';
    const posterKey = options?.secondary ? 'poster2' : 'poster';
    const mediaTypeKey = options?.secondary ? 'mediaType2' : 'mediaType';
    const fileKey = options?.secondary ? 'file2' : 'file';
    const previewKey = options?.secondary ? 'previewUrl2' : 'previewUrl';
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
      file: block[fileKey] || null,
      previewUrl: block[previewKey] || '',
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
      {block.type === 'text' ? renderTextField('Texto') : null}

      {block.type === 'quote-band' ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center space-y-6">
          <label className="block w-full space-y-1">
            <span className={labelClasses}>Citação</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center`}
              value={block.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </label>

          <label className="block w-full space-y-1">
            <span className={labelClasses}>Texto de apoio (opcional)</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center`}
              value={block.content.text2 || ''}
              onChange={(e) => updateContent({ text2: e.target.value })}
            />
          </label>

          <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2">
            <span className={labelClasses}>Cor da faixa</span>
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
                title="Valor hexadecimal da cor da faixa"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      ) : null}

      {block.type === 'image' &&
        renderMediaField('Imagem Full', { kind: 'image' })}

      {(block.type === 'video' || block.type === 'video-autoplay') &&
        renderMediaField(
          block.type === 'video-autoplay'
            ? 'Vídeo Autoplay (Loop)'
            : 'Vídeo Full',
          { kind: 'video' }
        )}

      {(block.type === 'image-text' ||
        block.type === 'text-image' ||
        block.type === 'video-text') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField(
            block.type === 'video-text' ? 'Mídia (Vídeo)' : 'Mídia (Imagem)',
            { kind: block.type === 'video-text' ? 'video' : 'image' }
          )}
          {renderTextField('Texto')}
        </div>
      )}

      {(block.type === 'image-image' || block.type === 'image-video') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField('Mídia 01', { kind: 'image' })}
          {renderMediaField(
            block.type === 'image-video' ? 'Mídia 02 (Vídeo)' : 'Mídia 02',
            {
              secondary: true,
              kind: block.type === 'image-video' ? 'video' : 'image',
            }
          )}
        </div>
      )}
    </div>
  );
}
