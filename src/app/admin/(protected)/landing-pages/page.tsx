import Link from 'next/link';
import { Edit, ExternalLink, Plus, Trash2 } from 'lucide-react';
import {
  deleteLandingPageAction,
  listLandingPagesAction,
} from '@/app/admin/(protected)/landing-pages/actions';
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

export default async function LandingPagesListPage() {
  const data = (await listLandingPagesAction()) as LandingPageRecord[];
  const pages = data.map((page) => ({
    ...page,
    template: getTemplateFromContent(page.content),
  }));

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

      <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-sm">
        {pages.length > 0 ? (
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
                        className="p-2 text-slate-400 transition-colors hover:text-white"
                        title="Ver página pública"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link
                        href={`/admin/landing-pages/${page.id}`}
                        className="p-2 text-slate-400 transition-colors hover:text-blue-400"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Link>
                      <form
                        action={async () => {
                          'use server';
                          await deleteLandingPageAction(page.id);
                        }}
                      >
                        <button
                          className="p-2 text-slate-400 transition-colors hover:text-red-400"
                          title="Excluir"
                          type="submit"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
