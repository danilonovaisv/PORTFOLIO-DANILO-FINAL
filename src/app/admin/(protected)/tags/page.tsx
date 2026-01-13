import { createClient } from '@/lib/supabase/server';
import { TagForm } from '@/components/admin/TagForm';

export default async function TagsPage() {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from('portfolio_tags')
    .select('*')
    .order('sort_order', { ascending: true, nullsFirst: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Tags</p>
          <h1 className="text-3xl font-semibold">Categorias e filtros</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-slate-900/60">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Ordem</th>
              </tr>
            </thead>
            <tbody>
              {tags?.map((tag) => (
                <tr key={tag.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium text-white">{tag.label}</td>
                  <td className="px-4 py-3 text-slate-300">{tag.slug}</td>
                  <td className="px-4 py-3 text-slate-300">{tag.kind}</td>
                  <td className="px-4 py-3 text-slate-300">{tag.sort_order ?? '—'}</td>
                </tr>
              ))}
              {!tags?.length && (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-400" colSpan={4}>
                    Nenhuma tag cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold mb-3">Nova tag</h2>
          <TagForm />
        </div>
      </div>
    </div>
  );
}
