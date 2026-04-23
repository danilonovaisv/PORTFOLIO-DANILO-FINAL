'use client';

import { ArrowLeft, Save, ExternalLink } from 'lucide-react';
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
    <div className="sticky top-4 z-50 flex items-center justify-between border border-white/5 bg-black/40 p-4 backdrop-blur-xl">
      <Link
        href="/admin/landing-pages"
        className="flex items-center gap-2 px-4 font-mono text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} className="text-blue-500" />
        <span className="hidden sm:inline">Back_To_List</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex flex-col items-end gap-0.5">
          <span className="font-mono text-[9px] uppercase text-white/30 tracking-tighter">
            Metadata_Status
          </span>
          <span className="font-mono text-[10px] text-blue-500/80 uppercase">
            {template === MASTER_PROJECT_TEMPLATE
              ? `${masterTemplateItemCount.toString().padStart(2, '0')}_ITEMS_IN_GRID`
              : template === MASTER_PROJECT_TEMPLATE_V2
                ? `${masterTemplateV2ItemCount.toString().padStart(2, '0')}_BLOCKS_IN_V2`
                : template === MASTER_PROJECT_TEMPLATE_V3
                  ? `${masterTemplateV3ItemCount.toString().padStart(2, '0')}_BLOCKS_IN_V3`
                  : `${sectionsCount.toString().padStart(2, '0')}_LEGACY_BLOCKS`}
          </span>
        </div>

        <div className="h-8 w-[1px] bg-white/5 hidden sm:block" />

        <div className="flex items-center gap-3">
          {slug && (
            <Link
              href={`/projects/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60 transition-all hover:border-blue-500/40 hover:text-white"
            >
              <ExternalLink size={12} />
              Preview
            </Link>
          )}

          <button
            onClick={onSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 px-6 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-blue-500 disabled:opacity-50"
          >
            <Save size={14} />
            {loading ? 'Committing...' : 'Commit_Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
