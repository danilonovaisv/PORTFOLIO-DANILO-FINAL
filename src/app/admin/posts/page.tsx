import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DeletePostButton } from '@/components/admin/DeletePostButton';

export default async function PostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400 border-b border-gray-800">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-gray-900 transition-colors">
                <td className="p-4 font-medium text-white">{post.title}</td>
                <td className="p-4 text-gray-400 font-mono text-sm">
                  {post.slug}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs uppercase font-bold tracking-wider ${post.published ? 'bg-green-950 text-green-400 border border-green-900' : 'bg-yellow-950 text-yellow-400 border border-yellow-900'}`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="p-2 text-blue-400 hover:bg-blue-900/30 rounded transition-colors"
                      title="Edit Post"
                    >
                      <Edit size={18} />
                    </Link>
                    <DeletePostButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-500">
                  No posts found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
