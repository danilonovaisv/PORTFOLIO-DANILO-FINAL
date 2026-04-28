'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { upsertTagAction } from '@/app/admin/(protected)/tags/actions';
import type { DbTag } from '@/types/admin';

const tagSchema = z.object({
  label: z.string().min(2),
  slug: z.string().min(2),
  kind: z.enum(['category', 'discipline', 'industry']).default('category'),
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

  type FormValues = z.input<typeof tagSchema>;
  const normalizedKind: NonNullable<FormValues['kind']> =
    tag?.kind === 'category' ||
    tag?.kind === 'discipline' ||
    tag?.kind === 'industry'
      ? tag.kind
      : 'category';

  const form = useForm<FormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      label: tag?.label ?? '',
      slug: tag?.slug ?? '',
      kind: normalizedKind,
      description: tag?.description ?? '',
      sort_order: tag?.sort_order ?? undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setError(null);
    startTransition(async () => {
      try {
        const payload = tagSchema.parse(values);
        await upsertTagAction({
          id: tag?.id,
          ...payload,
        });
        router.refresh();
        onSaved?.();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'SYSTEM_ERR: UNKNOWN_UPSERT_FAILURE'
        );
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            System_Label_Identity
          </span>
          <input
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none"
            placeholder="node.identity_ref"
            {...form.register('label')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            System_Slug_Endpoint
          </span>
          <input
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none"
            placeholder="node-identity-slug"
            {...form.register('slug')}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            System_Kind_Classification
          </span>
          <select
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none appearance-none"
            {...form.register('kind')}
          >
            <option value="category" className="bg-[#040013]">
              Category
            </option>
            <option value="discipline" className="bg-[#040013]">
              Discipline
            </option>
            <option value="industry" className="bg-[#040013]">
              Industry
            </option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            System_Sort_Priority
          </span>
          <input
            type="number"
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none"
            placeholder="00"
            {...form.register('sort_order')}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          System_Meta_Description
        </span>
        <textarea
          rows={3}
          className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white transition-all focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none resize-none"
          placeholder="Technical specification summary..."
          {...form.register('description')}
        />
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-4 py-3">
          <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase text-rose-400">
            ERR: {error}
          </span>
        </div>
      )}

      <button
        type="submit"
        className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-[#0048ff] py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#0048ff]/90 active:scale-[0.98] disabled:opacity-50"
        disabled={isPending}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isPending ? (
            <>
              <div className="h-2 w-2 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              EXECUTING_UPSERT...
            </>
          ) : (
            <>
              PUSH_TAG_UPDATE
              <div className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
            </>
          )}
        </span>
      </button>
    </form>
  );
}
