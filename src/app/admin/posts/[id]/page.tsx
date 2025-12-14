import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { PostForm } from '@/components/admin/PostForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <PostForm initialData={post} />
    </div>
  );
}
