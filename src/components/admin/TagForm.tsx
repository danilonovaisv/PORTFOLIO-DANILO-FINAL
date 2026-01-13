'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import type { DbTag } from '@/types/admin';

const tagSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  kind: z.string().default('category'),
  description: z.string().optional(),
  sort_order: z.coerce.number().int().optional(),
});

type Props = {
  tag?: DbTag;
  onSaved?: () => void;
};

export function TagForm({ tag, onSaved }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      label: tag?.label ?? '',
      slug: tag?.slug ?? '',
      kind: tag?.kind ?? 'category',
      description: tag?.description ?? '',
      sort_order: tag?.sort_order ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof tagSchema>) => {
    setError(null);
    startTransition(async () => {
      try {
        const supabase = createClient();
        const { error: upsertError } = await supabase
          .from('portfolio_tags')
          .upsert(
            {
              id: tag?.id,
              ...values,
            },
            { onConflict: 'id' }
          );

        if (upsertError) throw upsertError;
        router.refresh();
        onSaved?.();
      } catch (err: any) {
        setError(err.message);
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Label</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('label')}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Slug</span>
          <input
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('slug')}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Tipo</span>
          <select
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('kind')}
          >
            <option value="category">Categoria</option>
            <option value="discipline">Disciplina</option>
            <option value="industry">Indústria</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Ordem</span>
          <input
            type="number"
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            {...form.register('sort_order')}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-slate-300">Descrição</span>
        <textarea
          rows={3}
          className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
          {...form.register('description')}
        />
      </label>

      {error && <div className="text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Salvando...' : 'Salvar tag'}
      </button>
    </form>
  );
}
