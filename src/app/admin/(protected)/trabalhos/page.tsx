export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import Link from 'next/link';
import { requireAdminAccess } from '@/lib/admin/server-access';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';
import ProjectsTable from '@/components/admin/ProjectsTable';

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
      'id, title, client_name, year, featured_on_home, featured_on_portfolio, is_published, thumbnail_path, hero_image_path, project_type, slug, updated_at, url_landscape, url_square, landing_page_id, landing_pages(content)'
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
      '[admin/trabalhos] Falha Crítica ao listar projetos:',
      JSON.stringify(projectsError, null, 2)
    );
  } else {
    console.warn(
      `[admin/trabalhos] Projetos encontrados: ${baseProjects?.length ?? 0}`
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
      project.tags.some((relation: any) => relation.tag.slug === tagFilter)
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

      <ProjectsTable projects={filteredProjects} />
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
