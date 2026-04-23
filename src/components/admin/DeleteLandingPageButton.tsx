'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { deleteLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';

type Props = {
  id: string;
  title: string;
  compact?: boolean;
};

export function DeleteLandingPageButton({ id, title, compact = false }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `SYSTEM_PURGE_CONFIRM: Permanently delete entry "${title}" from registry?`
    );
    if (!confirmed) return;

    startTransition(async () => {
      await deleteLandingPageAction(id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      disabled={isPending}
      aria-label={`SYSTEM_PURGE: ${title}`}
      title="System_Purge"
      className={
        compact
          ? 'text-white/40 hover:text-rose-500 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-50'
          : 'p-2 text-white/40 transition-colors hover:text-rose-500 disabled:opacity-50'
      }
    >
      <Trash2 size={compact ? 14 : 16} strokeWidth={1.5} /> {compact ? 'System_Purge_Entry' : null}
    </button>
  );
}
