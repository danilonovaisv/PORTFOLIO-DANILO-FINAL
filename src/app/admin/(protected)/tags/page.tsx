export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

import { createClient } from '@/lib/supabase/server';
import { TagForm } from '@/components/admin/TagForm';

const KIND_LABELS: Record<string, string> = {
  category: 'Categoria',
  discipline: 'Disciplina',
  industry: 'Indústria',
};

export default async function TagsPage() {
  const supabase = await createClient();
  const { data: tags } = await supabase
    .from('portfolio_tags')
    .select('*')
    .order('kind', { ascending: true })
    .order('sort_order', { ascending: true, nullsFirst: false });

  const tagList = tags ?? [];
  type TagRow = NonNullable<(typeof tagList)[number]>;
  const grouped = tagList.reduce<Record<string, TagRow[]>>((acc, tag) => {
    const group = acc[tag.kind] ?? [];
    group.push(tag);
    acc[tag.kind] = group;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Tags
          </p>
          <h1 className="text-3xl font-semibold">Categorias e filtros</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {Object.entries(grouped).map(([kind, groupTags]) => (
            <div
              key={kind}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    {kind.toUpperCase()}
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    {KIND_LABELS[kind] ?? kind}
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  {groupTags.length} tag{groupTags.length === 1 ? '' : 's'}
                </span>
              </div>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="px-3 py-2">Tag</th>
                    <th className="px-3 py-2">Slug</th>
                    <th className="px-3 py-2">Ordem</th>
                  </tr>
                </thead>
                <tbody>
                  {groupTags.map((tag) => (
                    <tr key={tag.id} className="border-t border-white/5">
                      <td className="px-3 py-2 font-medium text-white">
                        {tag.label}
                      </td>
                      <td className="px-3 py-2 text-slate-300">{tag.slug}</td>
                      <td className="px-3 py-2 text-slate-300">
                        {tag.sort_order ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {!tags?.length && (
            <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-6 text-center text-slate-400">
              Nenhuma tag cadastrada.
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold mb-3">Nova tag</h2>
          <TagForm />
        </div>
      </div>
    </div>
  );
}
