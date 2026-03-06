'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import {
  ProjectTemplateId,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';

interface LandingPageHeaderProps {
  slug: string;
  loading: boolean;
  onSave: () => void;
  template: ProjectTemplateId;
  masterTemplateItemCount: number;
  masterTemplateV2ItemCount: number;
  masterTemplateV3ItemCount: number;
  sectionsCount: number;
}

export function LandingPageHeader({
  slug,
  loading,
  onSave,
  template,
  masterTemplateItemCount,
  masterTemplateV2ItemCount,
  masterTemplateV3ItemCount,
  sectionsCount,
}: LandingPageHeaderProps) {
  return (
    <div className="sticky top-4 z-50 flex items-center justify-between rounded-full border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-md">
      <Link
        href="/admin/landing-pages"
        className="flex items-center gap-2 px-4 text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Voltar</span>
      </Link>
      <div className="flex items-center gap-4">
        {slug ? (
          <Link
            href={`/projects/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-200 transition-colors hover:border-blue-400 hover:text-white md:inline-flex"
          >
            Preview
          </Link>
        ) : null}
        <span className="hidden text-sm text-slate-500 lg:inline">
          {template === MASTER_PROJECT_TEMPLATE
            ? `${masterTemplateItemCount} itens no gallery_grid`
            : template === MASTER_PROJECT_TEMPLATE_V2
              ? `${masterTemplateV2ItemCount} blocos no gallery_grid`
              : template === MASTER_PROJECT_TEMPLATE_V3
                ? `${masterTemplateV3ItemCount} blocos no gallery_grid`
                : `${sectionsCount} blocos adicionados`}
        </span>
        <button
          onClick={onSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? 'PUBLICANDO...' : 'SALVAR PÁGINA'}
        </button>
      </div>
    </div>
  );
}
