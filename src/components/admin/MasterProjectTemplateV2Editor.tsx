'use client';

import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  MasterProjectAsset,
  MasterProjectTemplateV2Data,
  MasterProjectV2FeatureItem,
  MasterProjectV2GalleryItem,
} from '@/types/project-template';

// Common components
import { MediaAssetField } from './templates/MediaAssetField';
import { CommonProjectMetadataFields } from './templates/CommonProjectMetadataFields';
import { CommonSEOAndNavFields } from './templates/CommonSEOAndNavFields';
import { labelClasses, inputClasses } from './templates/CommonTemplateStyles';

export type MasterProjectV2AssetDraft = MasterProjectAsset & {
  file?: File | null;
  previewUrl?: string;
};

export type MasterProjectV2FeatureDraft = MasterProjectV2FeatureItem;

export type MasterProjectV2GalleryDraft = MasterProjectV2GalleryItem & {
  file?: File | null;
  previewUrl?: string;
  features?: MasterProjectV2FeatureDraft[];
};

export type MasterProjectTemplateV2Draft = Omit<
  MasterProjectTemplateV2Data,
  'hero_cover_image' | 'hero_logo_image' | 'gallery_grid'
> & {
  hero_cover_image: MasterProjectV2AssetDraft;
  hero_logo_image?: MasterProjectV2AssetDraft;
  gallery_grid: MasterProjectV2GalleryDraft[];
};

interface MasterProjectTemplateV2EditorProps {
  value: MasterProjectTemplateV2Draft;
  onChange: (_next: MasterProjectTemplateV2Draft) => void;
}

const parseFeatures = (value: string): MasterProjectV2FeatureDraft[] => {
  return value
    .split('\n')
    .map((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        return {
          title: parts[0].trim(),
          description: parts.slice(1).join(':').trim(),
        } as MasterProjectV2FeatureDraft;
      }
      return null;
    })
    .filter((f): f is MasterProjectV2FeatureDraft => f !== null);
};

const toFeatureText = (features?: MasterProjectV2FeatureDraft[]) => {
  if (!features) return '';
  return features.map((f) => `${f.title}: ${f.description}`).join('\n');
};

const createGalleryDraft = (index: number): MasterProjectV2GalleryDraft => ({
  id: `v2-gallery-${Date.now()}-${index}`,
  src: '',
  alt: '',
  kind: 'image',
  poster: '',
  order: index,
  layout_type: 'full-width',
  features: [],
});

export default function MasterProjectTemplateV2Editor({
  value,
  onChange,
}: MasterProjectTemplateV2EditorProps) {
  const update = (updates: Partial<MasterProjectTemplateV2Draft>) => {
    onChange({ ...value, ...updates });
  };

  const updateGalleryItem = (
    id: string,
    updates: Partial<MasterProjectV2GalleryDraft>
  ) => {
    update({
      gallery_grid: value.gallery_grid.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeGalleryItem = (id: string) => {
    update({
      gallery_grid: value.gallery_grid.filter((item) => item.id !== id),
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= value.gallery_grid.length) return;
    const next = [...value.gallery_grid];
    [next[index], next[target]] = [next[target], next[index]];
    update({ gallery_grid: next });
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Base da Página (V2 Grid)
        </h2>
      </header>

      <section className="rounded-2xl border border-white/5 bg-slate-900/20 p-6">
        <CommonProjectMetadataFields value={value} update={update} />
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Hero e Identidade
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaAssetField
            label="Background da Hero"
            value={value.hero_cover_image}
            onChange={(next) => update({ hero_cover_image: next })}
            requireAlt
          />
          <MediaAssetField
            label="Logo Central (Project Logo)"
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
            Galeria de Mídia (Grid Dinâmico V2)
          </h3>
          <button
            type="button"
            onClick={() =>
              update({
                gallery_grid: [
                  ...value.gallery_grid,
                  createGalleryDraft(value.gallery_grid.length),
                ],
              })
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-blue-600 px-4 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-blue-500"
          >
            <Plus size={14} />
            Adicionar Item
          </button>
        </div>

        <div className="grid gap-8">
          <AnimatePresence mode="popLayout">
            {value.gallery_grid.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/20 transition-all hover:border-blue-500/20"
              >
                <header className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-blue-400">
                      ITEM {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <select
                      className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-400 outline-none"
                      value={item.layout_type}
                      onChange={(e) =>
                        updateGalleryItem(item.id, {
                          layout_type: e.target.value as any,
                        })
                      }
                      title="Tipo de layout do bloco"
                    >
                      <option value="full-width">Full Width</option>
                      <option value="contain">Contain</option>
                      <option value="grid-2">Grid 2 Cols</option>
                      <option value="with-features">With Features</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="rounded p-2 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-10"
                    >
                      SUBIR
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === value.gallery_grid.length - 1}
                      className="rounded p-2 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-10"
                    >
                      DESCER
                    </button>
                    <button
                      onClick={() => removeGalleryItem(item.id)}
                      className="rounded p-2 text-red-400 hover:bg-red-500/10"
                    >
                      EXCLUIR
                    </button>
                  </div>
                </header>

                <div className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <MediaAssetField
                      label="Asset Principal"
                      value={item}
                      onChange={(next) => updateGalleryItem(item.id, next)}
                      requireAlt
                    />

                    <div className="space-y-4">
                      <label className="space-y-1">
                        <span className={labelClasses}>Título do Bloco</span>
                        <input
                          className={inputClasses}
                          value={item.title || ''}
                          onChange={(e) =>
                            updateGalleryItem(item.id, {
                              title: e.target.value,
                            })
                          }
                        />
                      </label>

                      <label className="space-y-1">
                        <span className={labelClasses}>
                          Features (Formato: Rótulo: Valor - 1 por linha)
                        </span>
                        <textarea
                          className={`${inputClasses} min-h-32 font-mono whitespace-pre`}
                          value={toFeatureText(item.features)}
                          onChange={(e) =>
                            updateGalleryItem(item.id, {
                              features: parseFeatures(e.target.value),
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
