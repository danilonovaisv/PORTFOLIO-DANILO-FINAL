'use client';

import Image from 'next/image';
import { ImageIcon, Trash2, Settings2 } from 'lucide-react';
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
    <div className="sticky top-28 space-y-8 border border-white/5 bg-black/20 p-8 backdrop-blur-sm">
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <Settings2 size={14} className="text-blue-500" />
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          System_Config
        </h2>
      </div>

      <div className="space-y-3">
        <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">
          Template_Architecture
        </label>
        <select
          aria-label="Template Type"
          className="w-full border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs uppercase tracking-tight text-white outline-none focus:border-blue-500/50"
          value={template}
          onChange={(event) =>
            setTemplate(event.target.value as ProjectTemplateId)
          }
        >
          <option value={MASTER_PROJECT_TEMPLATE_V3}>V3_ALPA_ATOMIC</option>
          <option value={MASTER_PROJECT_TEMPLATE_V2}>V2_MLPE_GRID</option>
          <option value={MASTER_PROJECT_TEMPLATE}>V1_MASTER_CORE</option>
          <option value={LEGACY_PROJECT_TEMPLATE}>V0_LEGACY_BLOCKS</option>
        </select>
        <p className="font-mono text-[9px] leading-relaxed text-white/30 uppercase tracking-tighter">
          {template === MASTER_PROJECT_TEMPLATE_V3 
            ? "Atomic compositions with clean hero & asset zoom." 
            : template === MASTER_PROJECT_TEMPLATE_V2 
            ? "MLPE Standard with structured grid blocks." 
            : "Legacy system support mode."}
        </p>
      </div>

      <div className="space-y-3">
        <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">
          Project_Registry_Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            const nextTitle = e.target.value;
            setTitle(nextTitle);
            onSyncWithTemplates(nextTitle);
          }}
          className="w-full border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm uppercase tracking-tight text-white outline-none focus:border-blue-500/50"
          placeholder="ENTER_PROJECT_NAME"
        />
      </div>

      <div className="space-y-3">
        <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">
          Endpoint_Slug
        </label>
        <div className="flex items-center gap-2 border border-white/10 bg-black/40 px-4 py-3">
          <span className="font-mono text-[10px] text-white/20">/P/</span>
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
            className="w-full bg-transparent font-mono text-sm uppercase tracking-tight text-white outline-none"
            placeholder="PROJECT-SLUG"
          />
        </div>
      </div>

      {template === LEGACY_PROJECT_TEMPLATE ? (
        <div className="space-y-4 border-t border-white/5 pt-6">
          <label className="font-mono text-[9px] uppercase tracking-widest text-white/40">
            Hero_Buffer_Image
          </label>
          <div className="group relative aspect-video overflow-hidden border border-white/10 bg-black/40">
            {coverPreview ? (
              <>
                <Image
                  src={coverPreview}
                  alt="Cover"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <button
                  onClick={() => {
                    setCover(null);
                    setCoverPreview('');
                  }}
                  className="absolute top-4 right-4 bg-red-600/80 p-2 text-white backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100"
                  title="Remove_Asset"
                  aria-label="Remover Capa"
                  type="button"
                >
                  <Trash2 size={14} />
                </button>
              </>
            ) : (
              <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center transition-colors hover:bg-white/5">
                <ImageIcon className="mb-2 text-white/20" size={24} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Load_Cover_Asset</span>
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
