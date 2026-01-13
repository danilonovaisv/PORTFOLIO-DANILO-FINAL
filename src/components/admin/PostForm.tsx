'use client';

import React from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  postSchema,
  type PostFormData,
  type PostFormPayload,
} from '@/validations/post.schema';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UploadField } from './UploadField';
import { Loader2, Save } from 'lucide-react';

// TipTap Editor Component
const Editor = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (_val: any) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit], // Standard nodes like Paragraph, Heading, Bold, etc.
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    immediatelyRender: false, // Fix hydration mismatch for TipTap in Next.js
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 bg-gray-950 rounded-lg border border-gray-800',
      },
    },
  });

  return <EditorContent editor={editor} />;
};

interface PostFormProps {
  initialData?: Partial<PostFormData> & { id?: string };
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || {},
      cover_image: initialData?.cover_image || '',
      published: initialData?.published || false,
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
    },
  });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setLoading(true);
    try {
      const parsed: PostFormPayload = postSchema.parse(data);
      const payload = { ...parsed, updated_at: new Date().toISOString() };

      let error;
      if (initialData?.id) {
        const { error: err } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', initialData.id);
        error = err;
      } else {
        const { error: err } = await supabase.from('posts').insert(payload);
        error = err;
      }

      if (error) throw error;

      router.push('/admin/posts');
      router.refresh();
    } catch (e: any) {
      alert('Error saving post: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Fields: Title, Slug, Cover Image, Editor, SEO, Published Checkbox */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Title
            </label>
            <input
              {...register('title')}
              className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">
                {errors.title.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Slug
            </label>
            <input
              {...register('slug')}
              className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.slug && (
              <p className="text-red-400 text-sm">
                {errors.slug.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Controller
            control={control}
            name="cover_image"
            render={({ field }) => (
              <UploadField
                label="Cover Image"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Content
        </label>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <Editor value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className="border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Title
              </label>
              <input
                {...register('seo_title')}
                className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Description
              </label>
              <textarea
                {...register('seo_description')}
                className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-white h-24 outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-3 p-4 bg-gray-900 rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-800 transition-colors mb-4">
            <input
              type="checkbox"
              {...register('published')}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
            />
            <div className="flex flex-col">
              <span className="text-white font-medium">Published</span>
              <span className="text-xs text-gray-500">
                Post will be visible to the public
              </span>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save />}
            Save Post
          </button>
        </div>
      </div>
    </form>
  );
}
