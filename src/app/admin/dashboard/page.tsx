import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { FileText, CheckCircle, Clock } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });
  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true);
  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', false);

  const stats = [
    {
      label: 'Total Posts',
      value: totalPosts || 0,
      icon: FileText,
      color: 'text-blue-400',
    },
    {
      label: 'Published',
      value: publishedPosts || 0,
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      label: 'Drafts',
      value: draftPosts || 0,
      icon: Clock,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">{stat.label}</h3>
              <stat.icon className={stat.color} />
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center text-gray-400">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
}
