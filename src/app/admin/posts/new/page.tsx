import React from 'react';
import { PostForm } from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">New Post</h1>
      <PostForm />
    </div>
  );
}
