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

  const tagList: import('@/lib/supabase.types').Tables<'portfolio_tags'>[] =
    tags ?? [];
  type TagRow = NonNullable<(typeof tagList)[number]>;
  const grouped = (tagList as TagRow[]).reduce<Record<string, TagRow[]>>(
    (acc: Record<string, TagRow[]>, tag: TagRow) => {
      const group = acc[tag.kind] ?? [];
      group.push(tag);
      acc[tag.kind] = group;
      return acc;
    },
    {}
  );

  return (
    <div className="max-w-6xl space-y-12 py-6">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-blue-500/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-500/60">
            System_Main_Frame
          </p>
        </div>
        <h1 className="font-mono text-4xl font-light tracking-tight text-white sm:text-5xl">
          Tags<span className="text-blue-500">_</span>Management<span className="text-blue-500">.</span>
        </h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
        <div className="space-y-10">
          {(Object.entries(grouped) as [string, TagRow[]][]).length > 0 ? (
            (Object.entries(grouped) as [string, TagRow[]]).map(
              ([kind, groupTags]) => (
                <div
                  key={kind}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
                      <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-white">
                        {KIND_LABELS[kind] || kind}
                      </h2>
                    </div>
                    <span className="font-mono text-[9px] text-slate-600 uppercase">
                      Count: {groupTags.length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {groupTags.map((tag) => (
                      <div 
                        key={tag.id} 
                        className="group flex items-center justify-between rounded-lg border border-transparent bg-white/[0.01] px-4 py-3 transition-all hover:border-white/5 hover:bg-white/[0.03]"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-sm text-white tracking-tight group-hover:text-blue-400 transition-colors">
                            {tag.label}
                          </span>
                          <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                            SLUG: {tag.slug}
                          </span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="font-mono text-[8px] text-slate-700 uppercase tracking-tighter">Priority</span>
                            <span className="font-mono text-[10px] text-slate-400">
                              #{tag.sort_order?.toString().padStart(2, '0') ?? 'XX'}
                            </span>
                          </div>
                          <div className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-blue-500/50 transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          ) : (
            <div className="rounded-2xl border border-dashed border-white/5 bg-white/[0.01] py-20 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
                Null_Tags_Returned
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
              <div className="mb-8 space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-500/60">Module_Input</p>
                <h2 className="font-mono text-xl font-light text-white">New_Tag<span className="text-blue-500">.</span></h2>
              </div>
              <TagForm />
            </div>
            
            <div className="mt-6 rounded-xl border border-blue-500/10 bg-blue-500/5 p-5">
              <p className="font-mono text-[9px] leading-relaxed text-blue-400/70 uppercase">
                Note: Tags are global parameters used for filtering and taxonomy. 
                Ensure slug uniqueness for SEO consistency.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
