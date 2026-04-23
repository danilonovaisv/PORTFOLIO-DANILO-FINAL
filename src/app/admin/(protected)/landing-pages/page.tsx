import Link from 'next/link';
import { Edit, ExternalLink, Plus } from 'lucide-react';
import { listLandingPagesAction } from '@/app/admin/(protected)/landing-pages/actions';
import { DeleteLandingPageButton } from '@/components/admin/DeleteLandingPageButton';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  type ProjectTemplateId,
} from '@/types/project-template';

type LandingPageRecord = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  content: unknown;
};

function getTemplateFromContent(content: unknown): ProjectTemplateId {
  if (Array.isArray(content)) return LEGACY_PROJECT_TEMPLATE;
  if (content && typeof content === 'object' && 'template' in content) {
    const template = (content as { template?: string }).template;
    if (template === MASTER_PROJECT_TEMPLATE) return MASTER_PROJECT_TEMPLATE;
    if (template === MASTER_PROJECT_TEMPLATE_V2)
      return MASTER_PROJECT_TEMPLATE_V2;
    if (template === MASTER_PROJECT_TEMPLATE_V3)
      return MASTER_PROJECT_TEMPLATE_V3;
  }
  return LEGACY_PROJECT_TEMPLATE;
}

type Props = {
  searchParams: Promise<{
    search?: string;
    template?: string;
  }>;
};

export default async function LandingPagesListPage(props: Props) {
  const searchParams = await props.searchParams;
  const data = (await listLandingPagesAction()) as LandingPageRecord[];

  const query = searchParams?.search?.toLowerCase() || '';
  const templateFilter = searchParams?.template || '';

  const pages = data
    .map((page) => ({
      ...page,
      template: getTemplateFromContent(page.content),
    }))
    .filter((page) => {
      // Filtro de Busca
      if (query) {
        const matches =
          page.title.toLowerCase().includes(query) ||
          page.slug.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Filtro de Template
      if (templateFilter) {
        if (page.template !== templateFilter) return false;
      }

      return true;
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Gerenciamento
          </p>
          <h1 className="text-3xl font-semibold">Portfolio Projects</h1>
        </div>
        <Link
          href="/admin/landing-pages/new"
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Novo Projeto
        </Link>
      </div>

      <Filters
        current={{
          search: query,
          template: templateFilter,
        }}
      />

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm">
        {pages.length > 0 ? (
          <>
            <div className="hidden md:block">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-4 font-medium uppercase tracking-wider">
                      Criação
                    </th>
                    <th className="px-6 py-4 text-right font-medium uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pages.map((page) => (
                    <tr
                      key={page.id}
                      className="transition-colors hover:bg-white/2"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {page.title}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">
                        /{page.slug}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            page.template === MASTER_PROJECT_TEMPLATE ||
                            page.template === MASTER_PROJECT_TEMPLATE_V2 ||
                            page.template === MASTER_PROJECT_TEMPLATE_V3
                              ? 'border border-blue-400/30 bg-blue-500/15 text-blue-200'
                              : 'border border-white/10 bg-slate-700/50 text-slate-300'
                          }`}
                        >
                          {page.template === MASTER_PROJECT_TEMPLATE_V3
                            ? 'Template Mestre V3'
                            : page.template === MASTER_PROJECT_TEMPLATE
                              ? 'Template Mestre V1'
                              : page.template === MASTER_PROJECT_TEMPLATE_V2
                                ? 'Template Mestre V2'
                                : 'Legacy'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(page.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 transition-colors hover:text-white"
                            title="Ver página pública"
                            aria-label={`Ver página pública: ${page.title}`}
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <Link
                            href={`/admin/landing-pages/${page.id}`}
                            className="p-2 text-slate-400 transition-colors hover:text-blue-400"
                            title="Editar"
                            aria-label={`Editar projeto: ${page.title}`}
                          >
                            <Edit size={18} />
                          </Link>
                          <DeleteLandingPageButton
                            id={page.id}
                            title={page.title}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="border-b border-white/5 p-4 space-y-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{page.title}</span>
                    <span className="font-mono text-xs text-slate-400">
                      /{page.slug}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        page.template === MASTER_PROJECT_TEMPLATE ||
                        page.template === MASTER_PROJECT_TEMPLATE_V2 ||
                        page.template === MASTER_PROJECT_TEMPLATE_V3
                          ? 'border border-blue-400/30 bg-blue-500/15 text-blue-200'
                          : 'border border-white/10 bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {page.template === MASTER_PROJECT_TEMPLATE_V3
                        ? 'Template Mestre V3'
                        : page.template === MASTER_PROJECT_TEMPLATE
                          ? 'Template Mestre V1'
                          : page.template === MASTER_PROJECT_TEMPLATE_V2
                            ? 'Template Mestre V2'
                            : 'Legacy'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(page.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-5 pt-3 mt-1 border-t border-white/5">
                    <Link
                      href={`/projects/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1 text-xs"
                      aria-label={`Ver página pública: ${page.title}`}
                    >
                      <ExternalLink size={16} /> Ver
                    </Link>
                    <Link
                      href={`/admin/landing-pages/${page.id}`}
                      className="text-slate-400 hover:text-blue-400 flex items-center gap-1 text-xs"
                      aria-label={`Editar projeto: ${page.title}`}
                    >
                      <Edit size={16} /> Editar
                    </Link>
                    <DeleteLandingPageButton
                      id={page.id}
                      title={page.title}
                      compact
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <p className="mb-4 text-slate-400">Nenhum projeto criado.</p>
            <Link
              href="/admin/landing-pages/new"
              className="text-sm text-blue-400 hover:underline"
            >
              Criar meu primeiro projeto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function Filters({
  current,
}: {
  current: {
    search?: string;
    template?: string;
  };
}) {
  return (
    <form
      className="grid gap-3 md:grid-cols-4 rounded-xl border border-white/5 bg-slate-900/20 p-4"
      method="get"
    >
      <div className="md:col-span-2">
        <input
          name="search"
          placeholder="Buscar por título ou slug..."
          defaultValue={current.search}
          className="w-full rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
        />
      </div>

      <select
        name="template"
        title="Filtrar por Template"
        defaultValue={current.template || ''}
        className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm text-white focus:border-blue-500/50 focus:outline-none transition-colors"
      >
        <option value="">Todos os templates</option>
        <option value="master-project-v3-alpa">V3 ALPA</option>
        <option value="master-project-v2">V2 Master</option>
        <option value="master-project-v1">V1 Master</option>
        <option value="legacy-blocks">Legado</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
        >
          Filtrar
        </button>
        <Link
          href="/admin/landing-pages"
          className="flex items-center justify-center rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
        >
          Limpar
        </Link>
      </div>
    </form>
  );
}
