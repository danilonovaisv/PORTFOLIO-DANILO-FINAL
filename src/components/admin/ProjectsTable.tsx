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
            <th className="px-4 py-3">Flags</th>
            <th className="px-4 py-3">Variantes</th>
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
                  {project.thumbnail_path && (
                    <AdminMediaThumb
                      path={project.thumbnail_path}
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
                <div className="flex gap-2 text-xs">
                  {project.featured_on_home && (
                    <span className="px-2 py-1 rounded bg-white/10">Home</span>
                  )}
                  {project.featured_on_portfolio && (
                    <span className="px-2 py-1 rounded bg-white/10">
                      Portfólio
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                <div className="flex flex-col gap-1 text-xs">
                  <span
                    className={
                      project.thumbnail_path
                        ? 'text-emerald-300'
                        : 'text-amber-300'
                    }
                  >
                    16:9 {project.thumbnail_path ? 'ok' : 'faltando'}
                  </span>
                  <span
                    className={
                      project.hero_image_path
                        ? 'text-emerald-300'
                        : 'text-amber-300'
                    }
                  >
                    1:1 {project.hero_image_path ? 'ok' : 'faltando'}
                  </span>
                </div>
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
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          project.featured_on_home
                            ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30'
                            : 'bg-slate-700 text-slate-200 border border-white/10'
                        }`}
                      >
                        {project.featured_on_home ? 'Ativo' : 'Destacar'}
                      </button>
                    </form>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Portfólio:</span>
                    <form action={toggleFeaturedOnPortfolio}>
                      <input type="hidden" name="id" value={project.id} />
                      <input
                        type="hidden"
                        name="nextStatus"
                        value={project.featured_on_portfolio ? 'false' : 'true'}
                      />
                      <button
                        type="submit"
                        className={`rounded px-2 py-1 text-xs font-semibold ${
                          project.featured_on_portfolio
                            ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-200 border border-white/10'
                        }`}
                      >
                        {project.featured_on_portfolio ? 'Ativo' : 'Destacar'}
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
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      project.is_published
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
                  className="text-blue-300 hover:text-blue-200 text-sm"
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
