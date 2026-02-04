export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import Link from 'next/link';
import Image from 'next/image'; // Added import for next/image
import { createClient } from '@/lib/supabase/server';
import { togglePublish } from '@/lib/supabase/queries/projects';
import { ADMIN_NAVIGATION } from '@/config/admin-navigation';

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

  const supabase = await createClient();

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
      'id, title, client_name, year, featured_on_home, featured_home_order, featured_on_portfolio, featured_portfolio_order, is_published, thumbnail_path, project_type, slug, tags:portfolio_project_tags(tag:portfolio_tags(label, slug)), landing_page:landing_pages(slug)'
    )
    .order('updated_at', { ascending: false });

  if (tagFilter) query = query.eq('tags.tag.slug', tagFilter);
  if (yearFilter) query = query.eq('year', yearFilter);
  if (typeFilter) query = query.eq('project_type', typeFilter);
  if (statusFilter === 'published') query = query.eq('is_published', true);
  if (statusFilter === 'draft') query = query.eq('is_published', false);
  if (search)
    query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%`);

  const [{ data: projects }, { data: tags }] = await Promise.all([
    query,
    supabase
      .from('portfolio_tags')
      .select('id, label, slug')
      .order('sort_order', { ascending: true, nullsFirst: false }),
  ]);

  const uniqueYears = Array.from(
    new Set((projects ?? []).map((p) => p.year).filter(Boolean))
  ).sort((a, b) => (b ?? 0) - (a ?? 0));
  const uniqueTypes = Array.from(
    new Set((projects ?? []).map((p) => p.project_type).filter(Boolean))
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
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Ano</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Destaques</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id} className="border-t border-white/5">
                <td className="px-4 py-3 font-medium text-white">
                  <div className="flex items-center gap-3">
                    {project.thumbnail_path && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/portfolio-media/${project.thumbnail_path}`}
                        alt={project.title}
                        width={64} // Assuming width of 16 * 4 = 64px at 1x scale
                        height={40} // Assuming height of 10 * 4 = 40px at 1x scale
                        className="h-10 w-16 rounded object-cover border border-white/10"
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
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Home:</span>
                      {project.featured_on_home ? (
                        <span className="rounded bg-blue-500/15 px-2 py-1 text-blue-100">
                          #{project.featured_home_order ?? '—'}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Portfólio:</span>
                      {project.featured_on_portfolio ? (
                        <span className="rounded bg-emerald-500/15 px-2 py-1 text-emerald-100">
                          #{project.featured_portfolio_order ?? '—'}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
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
            {!projects?.length && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-slate-400"
                  colSpan={9}
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
