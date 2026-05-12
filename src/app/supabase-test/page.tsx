import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from('todos').select();

  return (
    <div className="p-8 bg-[#040013] min-h-screen text-white font-sans">
      <h1 className="text-3xl font-bold mb-6 text-[#0048ff]">
        Supabase Test Page
      </h1>
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="p-4 bg-[#0a061e] border border-[#0048ff]/20 rounded-lg"
          >
            {todo.name}
          </li>
        ))}
        {(!todos || todos.length === 0) && (
          <p className="text-gray-400 italic">
            Nenhum "todo" encontrado ou erro na conexão.
          </p>
        )}
      </ul>
    </div>
  );
}
