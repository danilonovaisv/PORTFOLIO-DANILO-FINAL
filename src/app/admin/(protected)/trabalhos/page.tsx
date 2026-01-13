import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function TrabalhosPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select(
      'id, title, client_name, year, featured_on_home, featured_on_portfolio, is_published, thumbnail_path, project_type, slug'
    )
    .order('updated_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Trabalhos</p>
          <h1 className="text-3xl font-semibold">Portfólio</h1>
        </div>
        <Link
          href="/admin/trabalhos/new"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600"
        >
          Novo trabalho
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Ano</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project) => (
              <tr key={project.id} className="border-t border-white/5">
                <td className="px-4 py-3 font-medium text-white">{project.title}</td>
                <td className="px-4 py-3 text-slate-300">{project.client_name}</td>
                <td className="px-4 py-3 text-slate-300">{project.year ?? '—'}</td>
                <td className="px-4 py-3 text-slate-300">{project.project_type}</td>
                <td className="px-4 py-3 text-slate-300">
                  <div className="flex gap-2 text-xs">
                    {project.featured_on_home && <span className="px-2 py-1 rounded bg-white/10">Home</span>}
                    {project.featured_on_portfolio && (
                      <span className="px-2 py-1 rounded bg-white/10">Portfólio</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {project.is_published ? (
                    <span className="text-green-400">Publicado</span>
                  ) : (
                    <span className="text-slate-400">Rascunho</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/trabalhos/${project.id}`}
                    className="text-blue-300 hover:text-blue-200 text-sm"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
            {!projects?.length && (
              <tr>
                <td className="px-4 py-6 text-center text-slate-400" colSpan={7}>
                  Nenhum projeto cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
