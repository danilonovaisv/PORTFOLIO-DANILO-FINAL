'use client';

import { Plus } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import type {
  MasterProjectAsset,
  MasterProjectGalleryItem,
  MasterProjectTemplateData,
} from '@/types/project-template';

// Common components
import { MediaAssetField } from './templates/MediaAssetField';
import { CommonProjectMetadataFields } from './templates/CommonProjectMetadataFields';
import { CommonSEOAndNavFields } from './templates/CommonSEOAndNavFields';

export type MasterProjectAssetDraft = MasterProjectAsset & {
  file?: File | null;
  previewUrl?: string;
};

export type MasterProjectGalleryDraft = MasterProjectGalleryItem & {
  file?: File | null;
  previewUrl?: string;
};

export type MasterProjectTemplateDraft = Omit<
  MasterProjectTemplateData,
  'hero_cover_image' | 'hero_logo_image' | 'gallery_grid'
> & {
  hero_cover_image: MasterProjectAssetDraft;
  hero_logo_image?: MasterProjectAssetDraft;
  gallery_grid: MasterProjectGalleryDraft[];
};

interface MasterProjectTemplateEditorProps {
  value: MasterProjectTemplateDraft;
  onChange: (_next: MasterProjectTemplateDraft) => void;
}

const createGalleryDraft = (index: number): MasterProjectGalleryDraft => ({
  id: `gallery-${Date.now()}-${index}`,
  src: '',
  alt: '',
  kind: 'image',
  poster: '',
  order: index,
  layout: 'grid',
});

export default function MasterProjectTemplateEditor({
  value,
  onChange,
}: MasterProjectTemplateEditorProps) {
  const update = (updates: Partial<MasterProjectTemplateDraft>) => {
    onChange({ ...value, ...updates });
  };

  const updateGalleryItem = (
    id: string,
    updates: Partial<MasterProjectGalleryDraft>
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
        <h2 className="font-mono text-xl font-bold tracking-tight text-white uppercase">
          System_V1_Core_Standard
        </h2>
      </header>

      <section className="rounded border border-white/5 bg-white/[0.02] p-6">
        <CommonProjectMetadataFields value={value} update={update} />
      </section>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bluePrimary">
          System_Identity_Node
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaAssetField
            label="System_Hero_Background"
            value={value.hero_cover_image}
            onChange={(next) => update({ hero_cover_image: next })}
            requireAlt
          />
          <MediaAssetField
            label="System_Project_Logo"
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
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-bluePrimary">
            System_Media_Grid_Core
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
            className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-bluePrimary px-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-bluePrimary/80"
          >
            <Plus size={14} />
            Add_Media_Node
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {value.gallery_grid.map((item, index) => (
              <m.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded border border-white/5 bg-white/[0.02] transition-all hover:border-bluePrimary/30"
              >
                <div className="p-4">
                  <MediaAssetField
                    label={`Item ${index + 1}`}
                    value={item}
                    onChange={(next) => updateGalleryItem(item.id, next)}
                    requireAlt
                  />

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="font-mono text-[9px] font-bold text-white/40">
                      ORDER_KEY: {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="font-mono text-[9px] font-bold uppercase tracking-widest rounded px-2 py-1 text-white/40 hover:bg-white/5 hover:text-white disabled:opacity-10"
                      >
                        Move_Up
                      </button>
                      <button
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === value.gallery_grid.length - 1}
                        className="font-mono text-[9px] font-bold uppercase tracking-widest rounded px-2 py-1 text-white/40 hover:bg-white/5 hover:text-white disabled:opacity-10"
                      >
                        Move_Down
                      </button>
                      <button
                        onClick={() => removeGalleryItem(item.id)}
                        className="font-mono text-[9px] font-bold uppercase tracking-widest rounded px-2 py-1 text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                      >
                        Delete_Node
                      </button>
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
