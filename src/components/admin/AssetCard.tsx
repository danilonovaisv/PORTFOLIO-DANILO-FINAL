'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { uploadToBucket } from '@/lib/supabase/storage';
import { createClient } from '@/lib/supabase/client';
import type { DbAsset } from '@/types/admin';

type Props = {
  asset: DbAsset;
  onUpdated?: () => void;
};

export function AssetCard({ asset, onUpdated }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (file?: File | null) => {
    if (!file) return;
    setError(null);
    startTransition(async () => {
      try {
        const newPath = await uploadToBucket(
          asset.bucket as 'site-assets',
          asset.page ? `${asset.page}` : 'global',
          asset.key.replace(/\./g, '-'),
          file
        );
        const supabase = createClient();
        const { error: updateError } = await supabase
          .from('site_assets')
          .update({ file_path: newPath })
          .eq('id', asset.id);
        if (updateError) throw updateError;
        onUpdated?.();
      } catch (err: any) {
        setError(err.message);
      }
    });
  };

  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4 flex gap-4">
      <div className="w-24 h-24 rounded-md bg-slate-800 overflow-hidden relative">
        {asset.asset_type === 'image' &&
        process.env.NEXT_PUBLIC_SUPABASE_URL ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${asset.bucket}/${asset.file_path}`}
            alt={asset.key}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            {asset.asset_type}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-white">{asset.key}</div>
        <div className="text-xs text-slate-400">{asset.description}</div>
        <div className="text-xs text-slate-500 mt-1">
          {asset.bucket}/{asset.file_path}
        </div>
        {error && <div className="text-xs text-red-400 mt-2">{error}</div>}
        <label className="mt-3 inline-flex items-center gap-2 text-xs text-blue-300 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
            accept="image/*,video/*"
          />
          {isPending ? 'Enviando...' : 'Substituir arquivo'}
        </label>
      </div>
    </div>
  );
}
