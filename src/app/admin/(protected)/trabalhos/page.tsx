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
    template?: string;
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
  const templateFilter = resolvedSearchParams.template;

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
  })) as any[];

  let filteredProjects = tagFilter
    ? projects.filter((project) =>
        project.tags.some((relation: any) => relation.tag.slug === tagFilter)
      )
    : projects;

  // Filtro por Template
  if (templateFilter) {
    if (templateFilter === 'none') {
      filteredProjects = filteredProjects.filter((p) => !p.landing_page_id);
    } else {
      filteredProjects = filteredProjects.filter((p) => {
        const content = p.landing_pages?.content;
        return (
          content &&
          typeof content === 'object' &&
          !Array.isArray(content) &&
          'template' in content &&
          content.template === templateFilter
        );
      });
    }
  }

  const uniqueYears = Array.from(
    new Set(filteredProjects.map((p) => p.year).filter(Boolean))
  ).sort((a, b) => (b ?? 0) - (a ?? 0));
  const uniqueTypes = Array.from(
    new Set(filteredProjects.map((p) => p.project_type).filter(Boolean))
  );

  return (
    <div className="max-w-6xl space-y-12 py-6">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#0048ff]/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0048ff]/60">
              System_Database
            </p>
          </div>
          <h1 className="font-mono text-4xl font-light tracking-tight text-white">
            Portfólio<span className="text-[#0048ff]">.</span>
          </h1>
        </div>

        <Link
          href={ADMIN_NAVIGATION.trabalhos.new}
          className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#0048ff] px-8 py-3 text-[11px] font-mono uppercase tracking-widest text-white transition-all hover:bg-[#0048ff]/80 active:scale-95"
        >
          <div className="absolute inset-0 flex -translate-x-full transition-transform group-hover:translate-x-0">
             <div className="h-full w-full bg-white/20 blur-xl" />
          </div>
          <span className="relative">Add_New_Project</span>
        </Link>
      </header>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/30">
            Query_Filters
          </h2>
          <div className="h-[1px] flex-1 bg-white/5" />
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
            template: templateFilter,
          }}
        />

        <div className="pt-4">
           <ProjectsTable projects={filteredProjects} />
        </div>
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
    template?: string;
  };
}) {
  return (
    <form
      className="grid gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6"
      method="get"
    >
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-5">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Search_Query
          </label>
          <input
            name="search"
            placeholder="Title, Client..."
            defaultValue={current.search}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-4 py-2.5 font-mono text-xs text-white placeholder:text-white/20 focus:border-[#0048ff]/30 focus:outline-none transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Taxonomy
          </label>
          <select
            name="tag"
            defaultValue={current.tag || ''}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2.5 font-mono text-xs text-white focus:border-[#0048ff]/30 focus:outline-none appearance-none transition-all"
          >
            <option value="">All_Tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>
                {tag.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Timeline
          </label>
          <select
            name="year"
            defaultValue={current.year || ''}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2.5 font-mono text-xs text-white focus:border-[#0048ff]/30 focus:outline-none appearance-none transition-all"
          >
            <option value="">All_Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Project_Type
          </label>
          <select
            name="type"
            defaultValue={current.type || ''}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2.5 font-mono text-xs text-white focus:border-[#0048ff]/30 focus:outline-none appearance-none transition-all"
          >
            <option value="">All_Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12 pt-2">
        <div className="md:col-span-3">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Publication_Status
          </label>
          <select
            name="status"
            defaultValue={current.status || ''}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2.5 font-mono text-xs text-white focus:border-[#0048ff]/30 focus:outline-none appearance-none transition-all"
          >
            <option value="">Any_Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="md:col-span-4">
          <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-widest text-white/30">
            Engine_Template
          </label>
          <select
            name="template"
            defaultValue={current.template || ''}
            className="w-full rounded-lg border border-white/5 bg-black/40 px-3 py-2.5 font-mono text-xs text-white focus:border-[#0048ff]/30 focus:outline-none appearance-none transition-all"
          >
            <option value="">All_Templates</option>
            <option value="master-project-v3-alpa">V3 ALPA</option>
            <option value="master-project-v2">V2 Master</option>
            <option value="master-project-v1">V1 Master</option>
            <option value="legacy-blocks">Legacy</option>
            <option value="none">No Landing Page</option>
          </select>
        </div>

        <div className="md:col-span-5 flex items-end gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-white/5 border border-white/5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-[0.98]"
          >
            Execute_Query
          </button>
          <Link
            href={ADMIN_NAVIGATION.trabalhos.index}
            className="flex items-center justify-center rounded-lg border border-white/5 bg-transparent px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white/30 transition-all hover:text-white/60"
          >
            Reset
          </Link>
        </div>
      </div>
    </form>
  );
}
