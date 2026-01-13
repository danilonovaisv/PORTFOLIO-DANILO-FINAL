import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { postSchema } from '@/validations/post.schema';

export async function GET() {
  const supabase = await createClient();
  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const json = await request.json();
    // Validate with Zod (optional but good practice)
    // Note: postSchema might require transforming dates or managing defaults usually handled by DB.
    // We accept partial or full matching schema.
    const body = postSchema.parse(json);

    const { data, error } = await supabase
      .from('posts')
      .insert(body)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
