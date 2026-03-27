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
      `Tem certeza que deseja excluir "${title}"?`
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
      aria-label={`Excluir projeto: ${title}`}
      title="Excluir"
      className={
        compact
          ? 'text-slate-400 hover:text-red-400 flex items-center gap-1 text-xs disabled:opacity-50'
          : 'p-2 text-slate-400 transition-colors hover:text-red-400 disabled:opacity-50'
      }
    >
      <Trash2 size={compact ? 16 : 18} /> {compact ? 'Excluir' : null}
    </button>
  );
}
