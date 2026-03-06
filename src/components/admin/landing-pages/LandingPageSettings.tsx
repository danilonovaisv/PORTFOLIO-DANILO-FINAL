'use client';

import Image from 'next/image';
import { ImageIcon, Trash2 } from 'lucide-react';
import {
  ProjectTemplateId,
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';

interface LandingPageSettingsProps {
  title: string;
  setTitle: (_val: string) => void;
  slug: string;
  setSlug: (_val: string) => void;
  template: ProjectTemplateId;
  setTemplate: (_val: ProjectTemplateId) => void;
  coverPreview: string;
  setCover: (_f: File | null) => void;
  setCoverPreview: (_val: string) => void;
  onSyncWithTemplates: (_nextTitle: string) => void;
  onSyncSlugWithTemplates: (_nextSlug: string) => void;
}

export function LandingPageSettings({
  title,
  setTitle,
  slug,
  setSlug,
  template,
  setTemplate,
  coverPreview,
  setCover,
  setCoverPreview,
  onSyncWithTemplates,
  onSyncSlugWithTemplates,
}: LandingPageSettingsProps) {
  return (
    <div className="sticky top-28 space-y-6 rounded-3xl border border-white/5 bg-slate-900/40 p-6">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
        Configurações
      </h2>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Tipo de Template
        </label>
        <select
          aria-label="Tipo de Template"
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
          value={template}
          onChange={(event) =>
            setTemplate(event.target.value as ProjectTemplateId)
          }
        >
          <option value={MASTER_PROJECT_TEMPLATE_V3}>
            Template Mestre V3 (ALPA)
          </option>
          <option value={MASTER_PROJECT_TEMPLATE_V2}>
            Template Mestre V2 (MLPE)
          </option>
          <option value={MASTER_PROJECT_TEMPLATE}>Template Mestre V1</option>
          <option value={LEGACY_PROJECT_TEMPLATE}>Legacy Blocks</option>
        </select>
        <p className="text-[11px] leading-relaxed text-slate-500">
          O V3 (ALPA) usa blocos atômicos/composições com hero limpa e zoom de
          assets. O V2 mantém o MLPE, o V1 o template anterior e o Legacy mantém
          o builder antigo por blocos.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const nextTitle = e.target.value;
            setTitle(nextTitle);
            onSyncWithTemplates(nextTitle);
          }}
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-lg font-medium outline-none focus:border-blue-500"
          placeholder="Nome do Projeto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Slug URL
        </label>
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-500">
          <span className="text-xs">/projects/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              const nextSlug = e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9-]/g, '-');
              setSlug(nextSlug);
              onSyncSlugWithTemplates(nextSlug);
            }}
            className="w-full bg-transparent text-sm font-mono text-white outline-none"
            placeholder="my-project"
          />
        </div>
      </div>

      {template === LEGACY_PROJECT_TEMPLATE ? (
        <div className="space-y-3 border-t border-white/5 pt-4">
          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Header Hero Image{' '}
            <span className="text-[10px] text-blue-500">(Cover)</span>
          </label>
          <div className="group relative aspect-4/3 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
            {coverPreview ? (
              <>
                <Image
                  src={coverPreview}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => {
                    setCover(null);
                    setCoverPreview('');
                  }}
                  className="absolute top-2 right-2 rounded-full bg-red-600 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                  title="Remover Capa"
                  aria-label="Remover Capa"
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </>
            ) : (
              <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center transition-colors hover:bg-white/5">
                <ImageIcon className="mb-2 text-slate-600" />
                <span className="text-[10px] text-slate-500">Upload Capa</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setCover(f);
                      setCoverPreview(URL.createObjectURL(f));
                    }
                  }}
                />
              </label>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
