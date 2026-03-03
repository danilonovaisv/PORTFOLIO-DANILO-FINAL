'use client';

import { LandingPageBlock } from '@/types/landing-page';
import { MediaAssetField } from '../MediaAssetField';
import { inputClasses, labelClasses } from '../CommonTemplateStyles';

interface BlockEditorV3Props {
  block: LandingPageBlock;
  onChange: (_updates: Partial<LandingPageBlock>) => void;
}

export function BlockEditorV3({ block, onChange }: BlockEditorV3Props) {
  const updateContent = (updates: any) => {
    onChange({
      content: {
        ...block.content,
        ...updates,
      },
    });
  };

  /**
   * Internal helper to bridge LandingPageBlock content to MediaAssetField
   */
  const renderMediaField = (label: string, suffix: string = '') => {
    const mediaKey = suffix ? `media${suffix}` : 'media';
    const altKey = suffix ? `alt${suffix}` : 'alt';
    const posterKey = suffix ? `poster${suffix}` : 'poster';
    const fileKey = suffix ? `file${suffix}` : 'file';
    const previewKey = suffix ? `previewUrl${suffix}` : 'previewUrl';

    const value = {
      src: block.content[mediaKey] || '',
      alt: block.content[altKey] || '',
      kind: block.type.includes('video')
        ? ('video' as const)
        : ('image' as const),
      poster: block.content[posterKey] || '',
      file: block.content[fileKey] || null,
      previewUrl: block.content[previewKey] || '',
    };

    return (
      <MediaAssetField
        label={label}
        value={value}
        onChange={(next) => {
          updateContent({
            [mediaKey]: next.src,
            [altKey]: next.alt,
            [posterKey]: next.poster,
            [fileKey]: next.file,
            [previewKey]: next.previewUrl,
          });
        }}
        requireAlt={!block.type.includes('video')}
      />
    );
  };

  return (
    <div className="p-6 space-y-6">
      {block.type === 'quote-band' ? (
        <div className="max-w-3xl mx-auto w-full space-y-6 flex flex-col items-center justify-center">
          <label className="space-y-1 w-full">
            <span className={labelClasses}>Citação</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center w-full`}
              value={block.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </label>

          <label className="space-y-1 w-full">
            <span className={labelClasses}>Texto de apoio (opcional)</span>
            <textarea
              className={`${inputClasses} min-h-20 text-center w-full`}
              value={block.content.text2 || ''}
              onChange={(e) => updateContent({ text2: e.target.value })}
            />
          </label>

          <div className="flex flex-col items-center gap-2 w-full max-w-xs mx-auto">
            <span className={labelClasses}>Cor da faixa</span>
            <div className="flex gap-2 w-full">
              <input
                type="color"
                className="h-10 w-12 border border-white/10 bg-transparent"
                value={block.content.bandColor || '#0048ff'}
                onChange={(e) => updateContent({ bandColor: e.target.value })}
                title="Seletor de cor da faixa"
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

      {block.type === 'image' && renderMediaField('Imagem Full')}

      {(block.type === 'video' || block.type === 'video-autoplay') &&
        renderMediaField(
          block.type === 'video-autoplay'
            ? 'Vídeo Autoplay (Loop)'
            : 'Vídeo Full'
        )}

      {(block.type === 'image-text' ||
        block.type === 'text-image' ||
        block.type === 'video-text') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField(
            block.type === 'video-text' ? 'Mídia (Vídeo)' : 'Mídia (Imagem)'
          )}

          <label className="space-y-1">
            <span className={labelClasses}>Texto</span>
            <textarea
              className={`${inputClasses} min-h-40`}
              value={block.content.text || ''}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </label>
        </div>
      )}

      {(block.type === 'image-image' || block.type === 'image-video') && (
        <div className="grid gap-4 md:grid-cols-2">
          {renderMediaField('Mídia 01', '1')}
          {renderMediaField(
            block.type === 'image-video' ? 'Mídia 02 (Vídeo)' : 'Mídia 02',
            '2'
          )}
        </div>
      )}
    </div>
  );
}
