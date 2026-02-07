export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import Link from 'next/link';
import Image from 'next/image';
import { requireAdminAccess } from '@/lib/admin/server-access';
import {
  toggleFeaturedOnHome,
  toggleFeaturedOnPortfolio,
  togglePublish,
} from '@/lib/supabase/queries/projects';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import { buildSupabaseStorageUrl } from '@/lib/supabase/urls';
import { DEFAULT_VIDEO_POSTER } from '@/lib/video';
import { isVideo } from '@/utils/utils';

type Props = {
  searchParams: Promise<{
    tag?: string;
    year?: string;
    type?: string;
    status?: 'published' | 'draft';
    search?: string;
  }>;
};

export default async function TrabalhosPage(props: Props) {
  const searchParams = await props.searchParams;

  const { supabase } = await requireAdminAccess();

  const resolvedSearchParams = searchParams || {};

  // filtros básicos
  const tagFilter = resolvedSearchParams.tag;
  const yearFilter = resolvedSearchParams.year
    ? Number(resolvedSearchParams.year)
    : undefined;
  const typeFilter = resolvedSearchParams.type;
  const statusFilter = resolvedSearchParams.status;
  const search = resolvedSearchParams.search;

  let query = supabase
    .from('portfolio_projects')
    .select(
      'id, title, client_name, year, featured_on_home, featured_on_portfolio, is_published, thumbnail_path, hero_image_path, project_type, slug'
    )
    .order('updated_at', { ascending: false });

  if (yearFilter) query = query.eq('year', yearFilter);
  if (typeFilter) query = query.eq('project_type', typeFilter);
  if (statusFilter === 'published') query = query.eq('is_published', true);
  if (statusFilter === 'draft') query = query.eq('is_published', false);
  if (search)
    query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%`);

  const [{ data: baseProjects, error: projectsError }, { data: tags }] =
    await Promise.all([
      query,
      supabase
        .from('portfolio_tags')
        .select('id, label, slug')
        .order('label', { ascending: true }),
    ]);

  if (projectsError) {
    console.error(
      '[admin/trabalhos] Erro ao listar projetos:',
      projectsError.message,
      projectsError.details,
      projectsError.hint
    );
  }

  const projectIds = (baseProjects ?? []).map((project) => project.id);
  const { data: projectTagRows, error: projectTagsError } =
    projectIds.length > 0
      ? await supabase
          .from('portfolio_project_tags')
          .select('project_id, tag_id')
          .in('project_id', projectIds)
      : { data: [], error: null };

  if (projectTagsError) {
    console.error(
      '[admin/trabalhos] Erro ao listar tags dos projetos:',
      projectTagsError.message,
      projectTagsError.details,
      projectTagsError.hint
    );
  }

  const tagsById = new Map((tags ?? []).map((tag) => [tag.id, tag]));
  const tagsByProject = new Map<
    string,
    Array<{ tag: { label: string; slug: string } }>
  >();

  for (const relation of projectTagRows ?? []) {
    const tag = tagsById.get(relation.tag_id);
    if (!tag) continue;

    const current = tagsByProject.get(relation.project_id) ?? [];
    current.push({ tag: { label: tag.label, slug: tag.slug } });
    tagsByProject.set(relation.project_id, current);
  }

  const projects = (baseProjects ?? []).map((project) => ({
    ...project,
    tags: tagsByProject.get(project.id) ?? [],
  }));

  const filteredProjects = tagFilter
    ? projects.filter((project) =>
        project.tags.some((relation) => relation.tag.slug === tagFilter)
      )
    : projects;

  const uniqueYears = Array.from(
    new Set(filteredProjects.map((p) => p.year).filter(Boolean))
  ).sort((a, b) => (b ?? 0) - (a ?? 0));
  const uniqueTypes = Array.from(
    new Set(filteredProjects.map((p) => p.project_type).filter(Boolean))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Trabalhos
          </p>
          <h1 className="text-3xl font-semibold">Portfólio</h1>
        </div>
        <Link
          href={ADMIN_NAVIGATION.trabalhos.new}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Novo trabalho
        </Link>
      </div>

      <Filters
        tags={tags ?? []}
        years={uniqueYears as number[]}
        types={uniqueTypes as string[]}
        current={{
          tag: tagFilter,
          year: yearFilter,
          type: typeFilter,
          status: statusFilter,
          search,
        }}
      />

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
        {projectsError ? (
          <div className="border-b border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Falha ao carregar projetos. Verifique permissões/filtros no Supabase
            e recarregue a página. {projectsError.message}
          </div>
        ) : null}
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
            {filteredProjects.map((project) => (
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
                    {project.tags?.map(
                      (t: {
                        tag:
                          | { label: string; slug: string }
                          | Array<{ label: string; slug: string }>;
                      }) => {
                        const tag = Array.isArray(t.tag) ? t.tag[0] : t.tag;
                        if (!tag) return null;
                        return (
                          <span
                            key={tag.slug}
                            className="px-2 py-1 rounded bg-white/10"
                          >
                            {tag.label}
                          </span>
                        );
                      }
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  <div className="flex gap-2 text-xs">
                    {project.featured_on_home && (
                      <span className="px-2 py-1 rounded bg-white/10">
                        Home
                      </span>
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
                          value={
                            project.featured_on_portfolio ? 'false' : 'true'
                          }
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
            {!filteredProjects.length && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-slate-400"
                  colSpan={10}
                >
                  Nenhum projeto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Filters({
  tags,
  years,
  types,
  current,
}: {
  tags: Array<{ id: string; label: string; slug: string }>;
  years: number[];
  types: string[];
  current: {
    tag?: string;
    year?: number;
    type?: string;
    status?: string;
    search?: string;
  };
}) {
  return (
    <form className="grid gap-3 md:grid-cols-5" method="get">
      <input
        name="search"
        placeholder="Buscar por título ou cliente"
        defaultValue={current.search}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm md:col-span-2"
      />
      <select
        name="tag"
        title="Filtrar por Tag"
        defaultValue={current.tag || ''}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
      >
        <option value="">Todas as tags</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.slug}>
            {tag.label}
          </option>
        ))}
      </select>
      <select
        name="year"
        title="Filtrar por Ano"
        defaultValue={current.year || ''}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
      >
        <option value="">Todos os anos</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        name="type"
        title="Filtrar por Tipo"
        defaultValue={current.type || ''}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
      >
        <option value="">Todos os tipos</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        name="status"
        title="Filtrar por Status"
        defaultValue={current.status || ''}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
      >
        <option value="">Todos</option>
        <option value="published">Publicado</option>
        <option value="draft">Rascunho</option>
      </select>
      <div className="flex gap-3 md:col-span-5">
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Filtrar
        </button>
        <Link
          href={ADMIN_NAVIGATION.trabalhos.index}
          className="rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          Limpar
        </Link>
      </div>
    </form>
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
