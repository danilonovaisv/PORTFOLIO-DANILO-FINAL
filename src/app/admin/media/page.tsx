import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { MediaUploader } from '@/components/admin/MediaUploader';

export default async function MediaPage() {
  const supabase = await createClient();
  const { data: files } = await supabase.storage
    .from('images')
    .list(undefined, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Media Library</h1>
      <div className="mb-8 p-6 bg-gray-950 border border-gray-800 rounded-lg">
        <MediaUploader />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {files?.map((file) => {
          // Filter out folder placeholders or non-image files if possible,
          // but for now display everything.
          if (file.name === '.emptyFolderPlaceholder') return null;
          const {
            data: { publicUrl },
          } = supabase.storage.from('images').getPublicUrl(file.name);
          return (
            <div
              key={file.id}
              className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden border border-gray-800 group"
            >
              <Image
                src={publicUrl}
                alt={file.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate" title={file.name}>
                  {file.name}
                </p>
              </div>
            </div>
          );
        })}
        {(!files || files.length === 0) && (
          <div className="col-span-full text-gray-500 text-center py-12">
            No images found.
          </div>
        )}
      </div>
    </div>
  );
}
