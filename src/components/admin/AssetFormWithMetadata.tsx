'use client';

import { useState, useTransition, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save');
        setUploadProgress('');
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Asset_Key</span>
          <input
            name="asset-key"
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none transition-all"
            placeholder="system.node.ref_01"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Page_Scope</span>
          <select
            name="asset-page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none appearance-none transition-all"
          >
            <option value="global" className="bg-[#040013]">GLOBAL_SCOPE</option>
            <option value="home" className="bg-[#040013]">HOME_INDEX</option>
            <option value="portfolio" className="bg-[#040013]">WORK_ARCHIVE</option>
            <option value="about" className="bg-[#040013]">INFO_CORE</option>
            <option value="clients" className="bg-[#040013]">PARTNER_LOGS</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Media_Type</span>
          <select
            name="asset-type"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none appearance-none transition-all"
          >
            <option value="image" className="bg-[#040013]">RASTER_IMAGE</option>
            <option value="video" className="bg-[#040013]">MOTION_STREAM</option>
            <option value="file" className="bg-[#040013]">GENERIC_DATA</option>
            <option value="font" className="bg-[#040013]">TYPEFACE_BIN</option>
            <option value="model" className="bg-[#040013]">MESH_GEOMETRY</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Sub_Path</span>
          <input
            name="asset-subpath"
            value={subPath}
            onChange={(e) => setSubPath(e.target.value)}
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none transition-all"
            placeholder="node/subdir/ref"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Sort_Priority</span>
          <input
            type="number"
            value={sortOrder ?? ''}
            onChange={(e) =>
              setSortOrder(e.target.value ? Number(e.target.value) : undefined)
            }
            className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none transition-all"
            placeholder="00"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Meta_Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="rounded border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-xs text-white focus:border-[#0048ff]/50 focus:bg-[#0048ff]/5 focus:outline-none transition-all resize-none"
          placeholder="Technical context of this registry..."
        />
      </label>

      {/* 3D Metadata Section */}
      <div className="border border-white/5 rounded bg-white/[0.01] p-6 space-y-4">
        <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-2">
          System_Spatial_Config
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">System_Pos (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={posX}
                onChange={(e) => setPosX(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={posY}
                onChange={(e) => setPosY(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={posZ}
                onChange={(e) => setPosZ(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Z"
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">System_Sca (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={scaleX}
                onChange={(e) => setScaleX(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={scaleY}
                onChange={(e) => setScaleY(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={scaleZ}
                onChange={(e) => setScaleZ(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Z"
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">System_Rot (X, Y, Z)</span>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={rotX}
                onChange={(e) => setRotX(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="X"
              />
              <input
                type="number"
                step="0.1"
                value={rotY}
                onChange={(e) => setRotY(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Y"
              />
              <input
                type="number"
                step="0.1"
                value={rotZ}
                onChange={(e) => setRotZ(Number(e.target.value))}
                className="w-full rounded border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-white focus:border-[#0048ff]/50 focus:outline-none"
                placeholder="Z"
              />
            </div>
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">System_Data_Buffer</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.ttf,.otf,.woff,.woff2,.pdf,.doc,.docx,.glb,.gltf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="font-mono text-[10px] text-white/30 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-[10px] file:font-mono file:uppercase file:tracking-widest file:bg-white/5 file:text-white hover:file:bg-white/10 transition-all cursor-pointer"
        />
      </label>

      {uploadProgress && (
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#0048ff]">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0048ff] animate-pulse" />
          {uploadProgress}
        </div>
      )}

      {error && <div className="text-sm text-red-400">{error}</div>}

      <button
        type="submit"
        className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-[#0048ff] py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#0048ff]/90 active:scale-[0.98] disabled:opacity-50"
        disabled={isPending}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isPending ? 'EXECUTING_UPSERT...' : 'PUSH_ASSET_UPDATE'}
          <div className="h-1 w-1 rounded-full bg-white/40 group-hover:bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all" />
        </span>
      </button>
    </form>
  );
}
