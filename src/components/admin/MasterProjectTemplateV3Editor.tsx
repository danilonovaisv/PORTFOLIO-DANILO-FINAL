'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { m, AnimatePresence } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import type { MasterProjectTemplateV3Data } from '@/types/project-template';

// Common components
import { MediaAssetField } from './templates/MediaAssetField';
import { CommonProjectMetadataFields } from './templates/CommonProjectMetadataFields';
import { CommonSEOAndNavFields } from './templates/CommonSEOAndNavFields';
import { HTMLVideoBlock } from '@/components/ui/HTMLVideoBlock';
// V3 specific sub-components (could be further extracted if needed)
import { BlockEditorV3 } from './templates/v3/BlockEditorV3';
import {
  BASIC_PRESETS,
  COMPOSITION_PRESETS,
  createBlockDraft,
} from './templates/v3/presets';

/** Botão reutilizável de adição de bloco — usado no topo e no rodapé da lista */
function AddBlockDropdown({ onAdd }: { onAdd: (_type: BlockType) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-bluePrimary px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-bluePrimary/90"
        >
          <Plus size={14} />
          Add_Block_Node
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-72 border-white/10 bg-background text-white font-mono"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          Core_Layouts
        </DropdownMenuLabel>
        {BASIC_PRESETS.map((preset) => {
          const Icon = preset.icon;
          return (
            <DropdownMenuItem
              key={preset.type}
              onClick={() => onAdd(preset.type)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {preset.label}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          System_Compositions
        </DropdownMenuLabel>
        {COMPOSITION_PRESETS.map((preset) => {
          const Icon = preset.icon;
          return (
            <DropdownMenuItem
              key={preset.type}
              onClick={() => onAdd(preset.type)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {preset.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type MasterProjectV3GalleryDraft = LandingPageBlock;

export type MasterProjectTemplateV3Draft = Omit<
  MasterProjectTemplateV3Data,
  'hero_cover_image' | 'hero_logo_image' | 'client_logo_image' | 'hero_top_media' | 'gallery_grid'
> & {
  hero_cover_image?: any;
  hero_logo_image?: any;
  client_logo_image?: any;
  hero_top_media?: any;
  hero_media_type?: 'none' | 'image' | 'video' | 'html';
  gallery_grid: MasterProjectV3GalleryDraft[];
};

interface MasterProjectTemplateV3EditorProps {
  value: MasterProjectTemplateV3Draft;
  onChange: (_next: MasterProjectTemplateV3Draft) => void;
}

export default function MasterProjectTemplateV3Editor({
  value,
  onChange,
}: MasterProjectTemplateV3EditorProps) {
  const reindexBlocks = (blocks: LandingPageBlock[]) =>
    blocks.map((block, index) => ({
      ...block,
      order: index,
    }));

  const update = (updates: Partial<MasterProjectTemplateV3Draft>) => {
    onChange({ ...value, ...updates });
  };

  const currentHeroMediaType =
    value.hero_media_type ||
    (value.hero_top_media?.kind
      ? value.hero_top_media.kind === 'html' || value.hero_top_media.kind === 'video'
        ? value.hero_top_media.kind
        : 'image'
      : 'none');

  const updateBlock = (id: string, updates: Partial<LandingPageBlock>) => {
    update({
      gallery_grid: reindexBlocks(
        value.gallery_grid.map((block) =>
          block.id === id ? { ...block, ...updates } : block
        )
      ),
    });
  };

  const removeBlock = (id: string) => {
    update({
      gallery_grid: reindexBlocks(
        value.gallery_grid.filter((block) => block.id !== id)
      ),
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= value.gallery_grid.length) return;
    const next = [...value.gallery_grid];
    [next[index], next[target]] = [next[target], next[index]];
    update({ gallery_grid: reindexBlocks(next) });
  };

  const addBlock = (type: BlockType) => {
    update({
      gallery_grid: reindexBlocks([
        ...value.gallery_grid,
        createBlockDraft(type, value.gallery_grid.length),
      ]),
    });
  };

  const handleHeroLogoChange = (next: any) => {
    update({
      hero_logo_image: next,
      client_logo_image: next,
    });
  };

  const handleHeroMediaTypeChange = (type: 'none' | 'image' | 'video' | 'html') => {
    update({
      hero_media_type: type,
      template: type !== 'none' ? 'master-project-v3-alpa-hero' : 'master-project-v3-alpa',
      hero_top_media:
        type === 'none'
          ? undefined
          : {
              ...(value.hero_top_media || {}),
              kind: type,
              alt: value.hero_top_media?.alt || `Hero media de ${value.project_title || 'projeto'}`,
            },
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-white/90">
          System_V3_Core_Architecture
        </h2>
      </header>

      <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <CommonProjectMetadataFields
          value={value}
          update={update}
          showThemeColor
        />
      </section>

      {/* Seção de Logo do Cliente */}
      <section className="space-y-4">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/80">
          Client_Identity_Assets (Logo do Cliente)
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaAssetField
            label="Client_Logo_Asset (Logo do Cliente / Marca)"
            value={
              value.client_logo_image ||
              value.hero_logo_image || {
                src: '',
                alt: value.project_client ? `Logo de ${value.project_client}` : 'Logo do cliente',
                kind: 'image',
                poster: '',
              }
            }
            onChange={handleHeroLogoChange}
            requireAlt
          />

          <MediaAssetField
            label="SEO_Cover_Asset (Fallback OpenGraph / Social)"
            value={
              value.hero_cover_image || {
                src: '',
                alt: `Capa de ${value.project_title || 'projeto'}`,
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_cover_image: next })}
          />
        </div>
      </section>

      {/* Seção de Mídia da Hero: Imagem ou Vídeo HTML */}
      <section className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/80">
              Hero_Media_Configuration (Mídia da Hero)
            </h3>
            <p className="font-mono text-[11px] text-white/60">
              Escolha se a hero exibe imagem de destaque, vídeo HTML embed ou cabeçalho minimalista.
            </p>
          </div>

          {/* Seletor de Formato */}
          <div className="inline-flex rounded-lg border border-white/10 bg-background p-1 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => handleHeroMediaTypeChange('none')}
              className={`rounded px-3 py-1.5 transition-all ${
                currentHeroMediaType === 'none'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sem Mídia
            </button>
            <button
              type="button"
              onClick={() => handleHeroMediaTypeChange('image')}
              className={`rounded px-3 py-1.5 transition-all ${
                currentHeroMediaType === 'image'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Imagem
            </button>
            <button
              type="button"
              onClick={() => handleHeroMediaTypeChange('html')}
              className={`rounded px-3 py-1.5 transition-all ${
                currentHeroMediaType === 'html' || currentHeroMediaType === 'video'
                  ? 'bg-bluePrimary text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Vídeo HTML
            </button>
          </div>
        </div>

        {/* Configuração de Imagem */}
        {currentHeroMediaType === 'image' && (
          <div className="mt-4 space-y-4">
            <MediaAssetField
              label="Hero_Image_Asset (Exibição no topo da landing page)"
              value={
                value.hero_top_media || {
                  src: '',
                  alt: `Hero media de ${value.project_title || 'projeto'}`,
                  kind: 'image',
                  poster: '',
                }
              }
              onChange={(next) =>
                update({
                  hero_top_media: {
                    ...next,
                    kind: 'image',
                  },
                })
              }
              requireAlt
            />
          </div>
        )}

        {/* Configuração de Vídeo HTML */}
        {(currentHeroMediaType === 'html' || currentHeroMediaType === 'video') && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold text-white/80">
                Código HTML do Vídeo (Embed iframe ou tag &lt;video&gt;)
              </label>
              <textarea
                value={value.hero_top_media?.html || ''}
                onChange={(e) =>
                  update({
                    hero_top_media: {
                      ...(value.hero_top_media || {}),
                      kind: 'html',
                      html: e.target.value,
                      alt: value.hero_top_media?.alt || `Vídeo do projeto ${value.project_title || ''}`,
                    },
                  })
                }
                placeholder="Cole aqui o código HTML, tag <video src='...'> ou iframe embed..."
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-background/80 p-3 font-mono text-xs text-white placeholder-white/30 focus:border-bluePrimary focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-xs font-semibold text-white/80">
                Texto Alternativo / Título do Vídeo (Acessibilidade)
              </label>
              <input
                type="text"
                value={value.hero_top_media?.alt || ''}
                onChange={(e) =>
                  update({
                    hero_top_media: {
                      ...(value.hero_top_media || {}),
                      alt: e.target.value,
                    },
                  })
                }
                placeholder="Ex: Demonstração em vídeo da interface responsiva"
                className="w-full rounded-lg border border-white/10 bg-background/80 p-2.5 font-mono text-xs text-white placeholder-white/30 focus:border-bluePrimary focus:outline-none"
              />
            </div>

            {/* Live Preview de Vídeo HTML com Tela Cheia */}
            {value.hero_top_media?.html && (
              <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-black/40 p-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-blue-400">
                  Preview do Vídeo HTML (Com suporte a tela cheia sem cortes)
                </span>
                <div className="max-h-[360px] overflow-hidden rounded-lg">
                  <HTMLVideoBlock
                    html={value.hero_top_media.html}
                    preserveVideoFrame
                    frameless
                    allowFullscreenToggle
                    className="max-h-[340px]"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <CommonSEOAndNavFields
        navigation={value.navigation}
        cta={value.cta}
        seo={value.seo}
        update={update}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500/80">
            System_Dynamic_Grid
          </h3>

          <AddBlockDropdown onAdd={addBlock} />
        </div>

        <div className="space-y-6">
          {value.gallery_grid.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/5 py-12 text-center font-mono text-[10px] uppercase tracking-widest text-white/20">
              No_Active_Nodes_Detected. Initiate_Block_Creation_Sequence.
            </div>
          )}

          <AnimatePresence>
            {value.gallery_grid.map((block, index) => (
              <m.div
                key={block.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:border-blue-500/20"
              >
                <header className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold text-blue-500/60">
                      ID: {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                      {block.type.replace('-', ' & ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      aria-label="Shift_Node_Up"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded text-white/40 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-10"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === value.gallery_grid.length - 1}
                      aria-label="Shift_Node_Down"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded text-white/40 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-10"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      aria-label="Purge_Node_Block"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </header>

                <BlockEditorV3
                  block={block}
                  onChange={(updates) => updateBlock(block.id, updates)}
                />
              </m.div>
            ))}
          </AnimatePresence>

          {/* Botão de adição de bloco no rodapé — evita scroll ao topo quando a lista é longa */}
          {value.gallery_grid.length > 0 && (
            <div className="flex justify-end pt-2">
              <AddBlockDropdown onAdd={addBlock} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
