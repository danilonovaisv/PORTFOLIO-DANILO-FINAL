import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

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
}
