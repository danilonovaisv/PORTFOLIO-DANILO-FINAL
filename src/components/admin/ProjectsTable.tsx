'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { isVideo } from '@/lib/utils';
import {
  toggleFeaturedOnHome,
  toggleFeaturedOnPortfolio,
  togglePublish,
} from '@/lib/supabase/actions/project-toggles';

type Project = {
  id: string;
  title: string;
  client_name: string;
  year: number | null;
  featured_on_home: boolean;
  featured_on_portfolio: boolean;
  is_published: boolean;
  thumbnail_path: string | null;
  hero_image_path: string | null;
  url_landscape: string | null;
  url_square: string | null;
  landing_page_id: string | null;
  landing_pages?: { content: any } | null;
  project_type: string | null;
  slug: string | null;
  tags: Array<{ tag: { label: string; slug: string } }>;
};

type Props = {
  projects: Project[];
};

export default function ProjectsTable({ projects }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel('admin_projects_list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_projects',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Ano</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Variantes</th>
            <th className="px-4 py-3">Modo</th>
            <th className="px-4 py-3">Destaques</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t border-white/5">
              <td className="px-4 py-3 font-medium text-white">
                <div className="flex items-center gap-3">
                  {(project.url_landscape || project.thumbnail_path) && (
                    <AdminMediaThumb
                      path={project.url_landscape || project.thumbnail_path!}
                      alt={project.title}
                    />
                  )}
                  <span>{project.title}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                {project.client_name}
              </td>
              <td className="px-4 py-3 text-slate-300">
                {project.year ?? '—'}
              </td>
              <td className="px-4 py-3 text-slate-300">
                {project.project_type}
              </td>
              <td className="px-4 py-3 text-slate-300">
                <div className="flex flex-wrap gap-1 text-[11px]">
                  {project.tags?.map((t) => (
                    <span
                      key={t.tag.slug}
                      className="px-2 py-1 rounded bg-white/10"
                    >
                      {t.tag.label}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                <div className="flex flex-col gap-1 text-xs">
                  <span
                    className={
                      project.url_landscape
                        ? 'text-emerald-300'
                        : project.thumbnail_path
                          ? 'text-blue-300'
                          : 'text-amber-300'
                    }
                  >
                    16:9{' '}
                    {project.url_landscape
                      ? 'ok'
                      : project.thumbnail_path
                        ? 'legado'
                        : 'faltando'}
                  </span>
                  <span
                    className={
                      project.url_square
                        ? 'text-emerald-300'
                        : project.hero_image_path
                          ? 'text-blue-300'
                          : 'text-amber-300'
                    }
                  >
                    1:1{' '}
                    {project.url_square
                      ? 'ok'
                      : project.hero_image_path
                        ? 'legado'
                        : 'faltando'}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                {project.landing_page_id ? (
                  <div className="flex flex-col gap-1 text-[10px]">
                    <span className="text-blue-300 font-medium">
                      Landing Page
                    </span>
                    <span className="text-slate-500 italic">
                      {project.landing_pages?.content &&
                        typeof project.landing_pages.content === 'object' &&
                        'template' in project.landing_pages.content
                        ? String(project.landing_pages.content.template)
                          .replace('master-project-', 'V')
                          .replace('-alpa', ' ALPA')
                        : 'Custom'}
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-500 text-[10px]">
                    Modal Default
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-300">
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Home:</span>
                    <form action={toggleFeaturedOnHome}>
                      <input type="hidden" name="id" value={project.id} />
                      <input
                        type="hidden"
                        name="nextStatus"
                        value={project.featured_on_home ? 'false' : 'true'}
                      />
                      <button
                        type="submit"
                        className={`rounded px-2.5 py-1.5 min-h-[44px] min-w-[44px] text-[11px] font-semibold transition motion-reduce:transition-none ${project.featured_on_home
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                            : 'bg-slate-700 text-slate-400 border border-white/5 hover:bg-slate-600'
                          }`}
                      >
                        {project.featured_on_home ? 'Ativo' : 'Off'}
                      </button>
                    </form>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Portfolio:</span>
                    <form action={toggleFeaturedOnPortfolio}>
                      <input type="hidden" name="id" value={project.id} />
                      <input
                        type="hidden"
                        name="nextStatus"
                        value={project.featured_on_portfolio ? 'false' : 'true'}
                      />
                      <button
                        type="submit"
                        className={`rounded px-2.5 py-1.5 min-h-[44px] min-w-[44px] text-[11px] font-semibold transition motion-reduce:transition-none ${project.featured_on_portfolio
                            ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-400 border border-white/5 hover:bg-slate-600'
                          }`}
                      >
                        {project.featured_on_portfolio ? 'Ativo' : 'Off'}
                      </button>
                    </form>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={project.id} />
                  <input
                    type="hidden"
                    name="nextStatus"
                    value={project.is_published ? 'false' : 'true'}
                  />
                  <button
                    type="submit"
                    className={`rounded px-3 py-2 min-h-[44px] text-xs font-semibold transition motion-reduce:transition-none ${project.is_published
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-slate-700 text-slate-200 border border-white/10'
                      }`}
                  >
                    {project.is_published ? 'Publicado' : 'Rascunho'}
                  </button>
                </form>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={ADMIN_NAVIGATION.trabalhos.detail(project.id)}
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded px-3 py-2 text-sm text-blue-300 hover:text-blue-200 hover:bg-white/5 transition motion-reduce:transition-none"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
          {!projects.length && (
            <tr>
              <td className="px-4 py-6 text-center text-slate-400" colSpan={10}>
                Nenhum projeto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function resolveMediaUrl(path: string) {
  return buildSupabaseStorageUrl('portfolio-media', path) ?? path;
}

function AdminMediaThumb({ path, alt }: { path: string; alt: string }) {
  const src = resolveMediaUrl(path);

  if (isVideo(src)) {
    return (
      <div className="h-10 w-16 overflow-hidden rounded border border-white/10 bg-black/30">
        <video
          src={src}
          muted
          playsInline
          loop
          autoPlay
          poster={DEFAULT_VIDEO_POSTER}
          className="h-full w-full object-cover"
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={40}
      className="h-10 w-16 rounded border border-white/10 object-cover"
    />
  );
}
