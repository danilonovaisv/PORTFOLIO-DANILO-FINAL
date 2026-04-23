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
    <div className="max-w-6xl space-y-12 py-6">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-blue-500/40" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
              System_Main_Frame
            </p>
          </div>
          <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl">
            Landing_Pages<span className="text-blue-500">.</span>
          </h1>
        </div>
        
        <Link
          href="/admin/landing-pages/new"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#0048ff] px-6 py-3 text-xs font-mono uppercase tracking-widest text-white transition-all hover:bg-[#0048ff]/80 hover:shadow-[0_0_20px_rgba(0,72,255,0.3)] active:scale-95"
        >
          <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-white/20 to-transparent transition-transform group-hover:translate-y-0" />
          <Plus size={16} className="relative z-10" />
          <span className="relative z-10">Deploy_New</span>
        </Link>
      </header>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Landing_Page_Nexus
          </h2>
          <div className="h-[1px] flex-1 mx-4 bg-white/5" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-white/20 uppercase">Total_Nodes:</span>
            <span className="font-mono text-[10px] text-[#0048ff]">{pages.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <Filters
          current={{
            search: query,
            template: templateFilter,
          }}
        />

        <div className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-xl">
          {pages.length > 0 ? (
            <>
              <div className="hidden md:block">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Node_Identity
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Endpoint_Slug
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Architecture
                      </th>
                      <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Registry_Date
                      </th>
                      <th className="px-6 py-4 text-right font-mono text-[10px] uppercase tracking-widest text-white/30">
                        Operations
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pages.map((page) => (
                      <tr
                        key={page.id}
                        className="group transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-5">
                          <span className="font-mono text-sm text-white group-hover:text-[#0048ff] transition-colors">
                            {page.title}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <code className="rounded bg-white/5 px-2 py-1 font-mono text-[10px] text-white/50">
                            /{page.slug}
                          </code>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-tighter ${
                              page.template === MASTER_PROJECT_TEMPLATE ||
                              page.template === MASTER_PROJECT_TEMPLATE_V2 ||
                              page.template === MASTER_PROJECT_TEMPLATE_V3
                                ? 'border-[#0048ff]/30 bg-[#0048ff]/10 text-[#0048ff]'
                                : 'border-white/10 bg-white/5 text-white/40'
                            }`}
                          >
                            {page.template === MASTER_PROJECT_TEMPLATE_V3
                              ? 'MASTER_V3'
                              : page.template === MASTER_PROJECT_TEMPLATE
                                ? 'MASTER_V1'
                                : page.template === MASTER_PROJECT_TEMPLATE_V2
                                  ? 'MASTER_V2'
                                  : 'LEGACY_ENV'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-mono text-[10px] text-white/30">
                            {new Date(page.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/projects/${page.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg p-2 text-white/30 transition-all hover:bg-white/5 hover:text-white"
                              title="Live Preview"
                            >
                              <ExternalLink size={14} />
                            </Link>
                            <Link
                              href={`/admin/landing-pages/${page.id}`}
                              className="rounded-lg p-2 text-white/30 transition-all hover:bg-[#0048ff]/10 hover:text-[#0048ff]"
                              title="Configure Node"
                            >
                              <Edit size={14} />
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
              <div className="grid grid-cols-1 divide-y divide-white/5 md:hidden">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="p-6 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-mono text-sm text-white">{page.title}</h3>
                        <code className="block font-mono text-[10px] text-white/30">/{page.slug}</code>
                      </div>
                      <span
                        className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-tighter ${
                          page.template === MASTER_PROJECT_TEMPLATE ||
                          page.template === MASTER_PROJECT_TEMPLATE_V2 ||
                          page.template === MASTER_PROJECT_TEMPLATE_V3
                            ? 'border-[#0048ff]/30 bg-[#0048ff]/10 text-[#0048ff]'
                            : 'border-white/10 bg-white/5 text-white/40'
                        }`}
                      >
                        {page.template === MASTER_PROJECT_TEMPLATE_V3 ? 'V3' : 'LEGACY'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-mono text-[9px] text-white/20">
                        {new Date(page.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/projects/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/30 hover:text-white transition-colors"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          href={`/admin/landing-pages/${page.id}`}
                          className="text-white/30 hover:text-[#0048ff] transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteLandingPageButton
                          id={page.id}
                          title={page.title}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="rounded-full bg-white/5 p-4 text-white/20">
                <Plus size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">No_Nodes_Detected</p>
                <p className="font-mono text-[10px] text-white/20 uppercase">Initialize system by creating your first project.</p>
              </div>
              <Link
                href="/admin/landing-pages/new"
                className="font-mono text-[10px] text-[#0048ff] uppercase tracking-widest hover:text-[#0048ff]/70"
              >
                [ EXECUTE_PROVISIONING ]
              </Link>
            </div>
          )}
        </div>
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
      className="grid grid-cols-1 gap-4 lg:grid-cols-12"
      method="get"
    >
      <div className="relative group lg:col-span-6">
        <div className="absolute inset-y-0 left-4 flex items-center text-white/30 group-focus-within:text-[#0048ff] transition-colors">
          <span className="font-mono text-[10px]">QRY:</span>
        </div>
        <input
          name="search"
          placeholder="SEARCH_PROJECT_INDEX..."
          defaultValue={current.search}
          className="w-full rounded-lg border border-white/5 bg-black/40 px-12 py-3 font-mono text-[10px] uppercase tracking-widest text-white placeholder:text-white/20 focus:border-[#0048ff]/50 focus:outline-none focus:ring-1 focus:ring-[#0048ff]/10 transition-all"
        />
      </div>

      <div className="relative lg:col-span-3">
        <select
          name="template"
          title="Architecture_Filter"
          defaultValue={current.template || ''}
          className="w-full appearance-none rounded-lg border border-white/5 bg-black/40 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white focus:border-[#0048ff]/50 focus:outline-none transition-all cursor-pointer"
        >
          <option value="">ALL_ARCHITECTURES</option>
          <option value="master-project-v3-alpa">MASTER_V3_ALPA</option>
          <option value="master-project-v2">MASTER_V2</option>
          <option value="master-project-v1">MASTER_V1</option>
          <option value="legacy-blocks">LEGACY_ENV</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/20">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex gap-2 lg:col-span-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white/10 active:scale-95 transition-all"
        >
          EXEC_FILTER
        </button>
        <Link
          href="/admin/landing-pages"
          className="flex items-center justify-center rounded-lg border border-white/5 bg-black/20 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 transition-all"
        >
          RST
        </Link>
      </div>
    </form>
  );
}
