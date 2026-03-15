'use client';

import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
// V3 specific sub-components (could be further extracted if needed)
import { BlockEditorV3 } from './templates/v3/BlockEditorV3';
import {
  BASIC_PRESETS,
  COMPOSITION_PRESETS,
  createBlockDraft,
} from './templates/v3/presets';

export type MasterProjectV3GalleryDraft = LandingPageBlock;

export type MasterProjectTemplateV3Draft = Omit<
  MasterProjectTemplateV3Data,
  'hero_cover_image' | 'hero_logo_image' | 'gallery_grid'
> & {
  hero_cover_image?: any;
  hero_logo_image?: any;
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

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Base da Página (V3 ALPA)
        </h2>
      </header>

      <section className="rounded-2xl border border-white/5 bg-slate-900/20 p-6">
        <CommonProjectMetadataFields
          value={value}
          update={update}
          showThemeColor
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Hero e Assets Fixos
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaAssetField
            label="Logo da Hero"
            value={
              value.hero_logo_image || {
                src: '',
                alt: '',
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_logo_image: next })}
            requireAlt
          />

          <MediaAssetField
            label="Capa SEO (opcional, não aparece na hero)"
            value={
              value.hero_cover_image || {
                src: '',
                alt: '',
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_cover_image: next })}
          />
        </div>
      </section>

      <CommonSEOAndNavFields
        navigation={value.navigation}
        cta={value.cta}
        seo={value.seo}
        update={update}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            Conteúdo Dinâmico (gallery_grid)
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-blue-600 px-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-blue-500"
              >
                <Plus size={14} />
                Adicionar bloco
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 border-white/10 bg-slate-950 text-slate-100"
            >
              <DropdownMenuLabel className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Layouts Básicos
              </DropdownMenuLabel>
              {BASIC_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <DropdownMenuItem
                    key={preset.type}
                    onClick={() => addBlock(preset.type)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {preset.label}
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Composições
              </DropdownMenuLabel>
              {COMPOSITION_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <DropdownMenuItem
                    key={preset.type}
                    onClick={() => addBlock(preset.type)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {preset.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-6">
          {value.gallery_grid.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/10 py-12 text-center text-sm text-slate-500">
              Nenhum bloco adicionado. Comece adicionando um novo bloco no menu
              acima.
            </div>
          )}

          <AnimatePresence>
            {value.gallery_grid.map((block, index) => (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/20 transition-all hover:border-blue-500/20"
              >
                <header className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-blue-400/60">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      {block.type.replace('-', ' & ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      aria-label="Mover bloco para cima"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-20"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === value.gallery_grid.length - 1}
                      aria-label="Mover bloco para baixo"
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-20"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      aria-label="Excluir bloco"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
