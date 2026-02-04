'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { upsertAsset } from '@/app/admin/(protected)/midia/actions';
import { getSiteAssetRoleByKey } from '@/lib/supabase/asset-roles';
import { uploadSiteAsset } from '@/lib/supabase/storage';

type AssetFormProps = {
  preset?: {
    key: string;
    page: string;
    asset_type: string;
    subPath?: string;
    description?: string;
  };
};

export function AssetForm({ preset }: AssetFormProps) {
  const router = useRouter();
  const [key, setKey] = useState(preset?.key ?? '');
  const [page, setPage] = useState(preset?.page ?? 'global');
  const [assetType, setAssetType] = useState(preset?.asset_type ?? 'image');
  const [description, setDescription] = useState(preset?.description ?? '');
  const [subPath, setSubPath] = useState(preset?.subPath ?? '');
  const [sortOrder, setSortOrder] = useState<number | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const role = getSiteAssetRoleByKey(key);
        let file_path: string | null = null;
        if (file) {
          file_path = await uploadSiteAsset({
            file,
            key,
            page,
            subPath: role?.subPath ?? subPath,
            bucket: 'site-assets',
          });
        }

        await upsertAsset({
          key,
          page,
          asset_type: assetType,
          description: description || role?.description || null,
          sort_order: sortOrder ?? null,
          file_path,
          bucket: 'site-assets',
        });
        router.refresh();
        // reset only file
        setFile(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao salvar');
      }
    });
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Key</span>
          <input
            name="asset-key"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            placeholder="home.hero_background"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Página</span>
          <select
            name="asset-page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
          >
            <option value="global">Global</option>
            <option value="home">Home</option>
            <option value="portfolio">Portfolio</option>
            <option value="about">About</option>
            <option value="clients">Clients</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Tipo</span>
          <select
            name="asset-type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="file">Arquivo</option>
            <option value="font">Fonte</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Subpasta (opcional)</span>
          <input
            name="asset-subpath"
            value={subPath}
            onChange={(e) => setSubPath(e.target.value)}
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            placeholder="logos, fonts, hero"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-slate-300">Ordem</span>
          <input
            type="number"
            value={sortOrder ?? ''}
            onChange={(e) =>
              setSortOrder(e.target.value ? Number(e.target.value) : undefined)
            }
            className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
            placeholder="10"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-slate-300">Descrição</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="rounded-md bg-slate-900/60 border border-white/10 px-3 py-2 text-sm"
          placeholder="Ex.: Logo principal do header"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-slate-300">Arquivo (opcional)</span>
        <input
          type="file"
          accept="image/*,video/*,.ttf,.otf,.woff,.woff2,.pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {error && <div className="text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-600 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? 'Salvando...' : 'Salvar asset'}
      </button>
    </form>
  );
}
