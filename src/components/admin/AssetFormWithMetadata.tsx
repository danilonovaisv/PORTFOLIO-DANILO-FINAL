'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { uploadSiteAssetFirebase } from '@/lib/firebase/storage-client';
import { upsertAsset } from '@/app/admin/(protected)/midia/actions';
import { getSiteAssetRoleByKey } from '@/lib/supabase/asset-roles';

type AssetFormWithMetadataProps = {
  preset?: {
    key: string;
    page: string;
    asset_type: string;
    subPath?: string;
    description?: string;
  };
};

export function AssetFormWithMetadata({ preset }: AssetFormWithMetadataProps) {
  const router = useRouter();
  const [key, setKey] = useState(preset?.key ?? '');
  const [page, setPage] = useState(preset?.page ?? 'global');
  const [assetType, setAssetType] = useState(preset?.asset_type ?? 'image');
  const [description, setDescription] = useState(preset?.description ?? '');
  const [subPath, setSubPath] = useState(preset?.subPath ?? '');
  const [sortOrder, setSortOrder] = useState<number | undefined>();
  const [file, setFile] = useState<File | null>(null);

  // Metadata fields
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [posZ, setPosZ] = useState<number>(0);
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);
  const [scaleZ, setScaleZ] = useState<number>(1);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [rotZ, setRotZ] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const role = getSiteAssetRoleByKey(key);
        let file_path: string | null = null;

        if (file) {
          setUploadProgress('Uploading to Firebase Storage...');
          const { url } = await uploadSiteAssetFirebase({
            file,
            key,
            page,
            subPath: role?.subPath ?? subPath,
          });
          file_path = url; // Store the public URL
          setUploadProgress('Upload complete. Saving metadata...');
        }

        const metadata = {
          position: [posX, posY, posZ] as [number, number, number],
          scale: [scaleX, scaleY, scaleZ] as [number, number, number],
          rotation: [rotX, rotY, rotZ] as [number, number, number],
        };

        await upsertAsset({
          key,
          page,
          asset_type: assetType,
          description: description || role?.description || null,
          sort_order: sortOrder ?? null,
          file_path,
          bucket: 'site-assets',
          metadata,
        });

        setUploadProgress('');
        router.refresh();
        setFile(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save');
        setUploadProgress('');
      }
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
            <option value="model">3D Model</option>
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

      {/* 3D Metadata Section */}
      <div className="border border-white/10 rounded-md p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">
          3D Metadata (Optional)
        </h3>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <span className="text-xs text-slate-400">Position (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={posZ}
                onChange={(e) => setPosZ(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Z"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400">Scale (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={scaleX}
                onChange={(e) => setScaleX(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={scaleY}
                onChange={(e) => setScaleY(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={scaleZ}
                onChange={(e) => setScaleZ(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Z"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-400">Rotation (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={rotX}
                onChange={(e) => setRotX(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={rotY}
                onChange={(e) => setRotY(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={rotZ}
                onChange={(e) => setRotZ(Number(e.target.value))}
                className="w-full rounded bg-slate-900/60 border border-white/10 px-2 py-1 text-xs"
                placeholder="Z"
              />
            </div>
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-slate-300">Arquivo (opcional)</span>
        <input
          type="file"
          accept="image/*,video/*,.ttf,.otf,.woff,.woff2,.pdf,.doc,.docx,.glb,.gltf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {uploadProgress && (
        <div className="text-sm text-blue-400">{uploadProgress}</div>
      )}

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
