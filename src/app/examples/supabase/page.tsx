import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const supabase = await createClient();

  try {
    const { data: todos, error } = await supabase.from('todos').select('*');

    if (error) {
      throw error;
    }

    return (
      <ul>
        {todos?.map((todo, index) => (
          <li key={(todo as { id?: string })?.id ?? index}>
            {JSON.stringify(todo)}
          </li>
        ))}
      </ul>
    );
  } catch (err) {
    // Gracefully handle missing table or auth issues without breaking build/runtime
    const message =
      err instanceof Error
        ? err.message
        : 'Erro ao carregar dados do Supabase (tabela "todos" ausente)';
    return (
      <div className="p-6 text-sm text-red-500">
        Supabase demo indisponível: {message}
      </div>
    );
  }
}
