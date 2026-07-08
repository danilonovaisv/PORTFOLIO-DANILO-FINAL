'use client';



export const runtime = 'edge';
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import {
  generateAdScenes,
  getSceneModelCapabilities,
} from '@/app/admin/(protected)/scene-generator/actions';
import {
  AI_MODELS,
  OUTPUT_RATIO_PRESETS,
  normalizeAIModels,
  SCENE_CATEGORIES,
  type OutputRatio,
} from '@/app/admin/(protected)/scene-generator/types';
import { MAX_REFERENCE_IMAGES } from '@/lib/admin/schemas/scene-generator';
import {
  Loader2,
  ImageIcon,
  Download,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import Image from 'next/image';
import { FieldTooltip } from '@/components/admin/FieldTooltip';

const initialState = {
  success: false,
  images: [] as string[],
  error: '',
  requestPayload: undefined,
};

const ratioPreviewClass: Record<OutputRatio, string> = {
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '4:5': 'aspect-[4/5]',
};

import { AdminHeader } from '@/components/admin/AdminHeader';

export default function SceneGeneratorPage() {
  const [state, formAction, isPending] = useActionState(
    generateAdScenes,
    initialState
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [batchSize, setBatchSize] = useState(3);
  const [outputRatio, setOutputRatio] = useState<OutputRatio>('16:9');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modelOptions, setModelOptions] = useState(() =>
    normalizeAIModels(AI_MODELS)
  );
  const [isCapabilitiesLoading, setIsCapabilitiesLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadCapabilities = async () => {
      try {
        const capabilities = await getSceneModelCapabilities();
        if (!mounted) return;
        setModelOptions(normalizeAIModels(capabilities));
      } catch {
        if (!mounted) return;
        setModelOptions(normalizeAIModels(AI_MODELS));
      } finally {
        if (mounted) {
          setIsCapabilitiesLoading(false);
        }
      }
    };

    void loadCapabilities();
    return () => {
      mounted = false;
    };
  }, []);

  const defaultModelId =
    modelOptions.find((model) => model.id === 'dall-e-3' && model.available)
      ?.id ?? modelOptions.find((model) => model.available)?.id;

  const handleFilesSelection = (files: FileList | null) => {
    if (!files) return;
    setSelectedImages(Array.from(files).slice(0, MAX_REFERENCE_IMAGES));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFilesSelection(event.target.files);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFilesSelection(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const previewAspect =
    state.requestPayload?.outputRatio ?? outputRatio ?? ('16:9' as OutputRatio);

  return (
    <div className="max-w-6xl space-y-12 py-6">
      <AdminHeader
        title="Scene_Generator"
        subtitle="Photorealistic mockup generator with batch control, ratio presets, and visual references."
        category="Creative_Engine"
        breadcrumbs={[
          { label: 'System', href: '/admin' },
          { label: 'Scene Generator', href: '/admin/scene-generator' },
        ]}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Settings Column */}
        <div className="space-y-8 lg:col-span-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
            <h2 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/70">
              Technical Settings
            </h2>
            <form
              action={formAction}
              className="space-y-5"
              encType="multipart/form-data"
            >
              <div className="space-y-2">
                <FieldTooltip
                  label="AI Model"
                  description="Select the active model for generation. Unavailable models are disabled."
                  className="flex items-center gap-1"
                />
                <div className="grid grid-cols-1 gap-2">
                  {modelOptions.length > 0 ? (
                    modelOptions.map((model) => (
                      <label
                        key={model.id}
                        className={`relative flex cursor-pointer items-center gap-3 rounded border p-3 transition-all duration-fast ${
                          model.available
                            ? 'border-white/5 bg-white/[0.01] hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]'
                            : 'cursor-not-allowed border-white/5 opacity-30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="model"
                          value={model.id}
                          defaultChecked={model.id === defaultModelId}
                          disabled={!model.available}
                          className="peer sr-only"
                        />
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/5 bg-white/[0.02] transition-colors peer-checked:border-emerald-500/30 peer-checked:bg-emerald-500/20 peer-checked:text-emerald-400">
                          <Sparkles size={14} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold uppercase tracking-tight text-white">
                              {model.name}
                            </span>
                            {!model.available && (
                              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/30">
                                N/A
                              </span>
                            )}
                          </div>
                          <p className="truncate font-mono text-[10px] uppercase tracking-tight text-white/40">
                            {model.description}
                          </p>
                        </div>
                        <div className="pointer-events-none absolute inset-0 rounded ring-1 ring-emerald-500/50 opacity-0 transition-opacity peer-checked:opacity-100" />
                      </label>
                    ))
                  ) : (
                    <>
                      <input type="hidden" name="model" value="dall-e-3" />
                      <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
                        Failed to load models. DALL-E 3 will be used as
                        fallback.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="Visual References"
                  description={`Drag multiple files (up to ${MAX_REFERENCE_IMAGES}) to guide lighting, style, and context.`}
                  className="flex items-center gap-1"
                />
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer rounded border border-dashed border-white/10 bg-white/[0.01] p-6 text-center transition-all duration-fast hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]"
                >
                  <UploadCloud className="mx-auto mb-3 h-6 w-6 text-white/20 transition-colors group-hover:text-emerald-500/50" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60">
                    Upload References
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-tight text-white/20">
                    PNG, JPG, WEBP · Máx 8MB
                  </p>
                  <input
                    ref={fileInputRef}
                    title="Upload reference images"
                    id="referenceImages"
                    name="referenceImages"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    multiple
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                </div>
                {selectedImages.length > 0 && (
                  <ul className="max-h-32 space-y-1 overflow-y-auto rounded border border-white/5 bg-black/40 p-3 font-mono text-[9px] uppercase tracking-tight text-white/40">
                    {selectedImages.map((file) => (
                      <li
                        key={`${file.name}-${file.lastModified}`}
                        className="flex justify-between"
                      >
                        <span className="truncate mr-2">{file.name}</span>
                        <span className="shrink-0 text-white/20">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="Batch Size"
                  description="Number of variations generated per execution (1 to 4)."
                  className="flex items-center gap-1"
                />
                <input
                  type="range"
                  title="Number of variations (Batch size)"
                  min={1}
                  max={4}
                  name="batchSize"
                  value={batchSize}
                  onChange={(event) => setBatchSize(Number(event.target.value))}
                  className="w-full accent-emerald-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                />
                <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-500/70">
                  {batchSize} VARIATIONS_STK
                </p>
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="Output Ratio"
                  description="Aspect ratio preset for the final render. Payload sends this as structured data."
                  className="flex items-center gap-1"
                />
                <div className="grid grid-cols-2 gap-2">
                  {OUTPUT_RATIO_PRESETS.map((ratio) => (
                    <label
                      key={ratio.id}
                      className={`cursor-pointer rounded border px-3 py-2 text-left transition-all duration-fast ${
                        outputRatio === ratio.id
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/5 bg-white/[0.01] text-white/40 hover:border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="outputRatio"
                        value={ratio.id}
                        checked={outputRatio === ratio.id}
                        onChange={() => setOutputRatio(ratio.id)}
                        className="sr-only"
                      />
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-tight">
                        {ratio.id}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-tight opacity-50">
                        {ratio.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="System_Piece_Type"
                  description="Mockup context to guide scale and scene environment."
                  className="flex items-center gap-1"
                />
                <select
                  id="pieceType"
                  name="pieceType"
                  title="Packaging or support type for the scene"
                  className="w-full rounded border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white outline-none transition-all focus:border-emerald-500/50"
                >
                  {SCENE_CATEGORIES.map((category) => (
                    <optgroup
                      key={category.value}
                      label={category.label}
                      className="bg-neutral-900"
                    >
                      {category.sub_options.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="Scene Description"
                  description="Main textual description for composition, lighting, and visual narrative."
                  className="flex items-center gap-1"
                />
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full resize-none rounded border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white placeholder:text-white/10 outline-none transition-all focus:border-emerald-500/50"
                  placeholder="DESCRIBE THE SCENE... (EX: PREMIUM SMARTPHONE, MARBLE, NATURAL LIGHT)"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-emerald-500 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-slow group-hover:translate-x-full" />
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>PROCESSING_{batchSize}_STK</span>
                  </div>
                ) : (
                  <span>GENERATE_VARIATIONS_STK ({batchSize})</span>
                )}
              </button>
            </form>

            {state.error && (
              <div className="rounded border border-red-500/20 bg-red-500/10 p-4 font-mono text-[10px] uppercase tracking-tight text-red-400">
                <p className="font-bold">ERROR_LOG:</p>
                <p className="mt-1">{state.error}</p>
                {state.supportCode && (
                  <p className="mt-2 opacity-50">CODE: {state.supportCode}</p>
                )}
              </div>
            )}

            {isCapabilitiesLoading && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                SYSTEM_LOADING_MODEL_AVAILABILITY...
              </p>
            )}
          </div>
        </div>

        {/* Preview Column */}
        <div className="min-h-[600px] lg:col-span-8">
          <div className="h-full rounded-xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-sm">
            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
              <div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Output Preview
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white">
                  Generation Results
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">
                    Live_Preview
                  </span>
                </div>
              </div>
            </div>

            {state.images && state.images.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {state.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`${idx === 0 ? 'md:col-span-2' : ''} ${ratioPreviewClass[previewAspect]} group relative overflow-hidden rounded border border-white/10 bg-black/40 transition-all duration-modal hover:border-emerald-500/30`}
                  >
                    <Image
                      src={img}
                      alt={`Scene ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute left-4 top-4 border border-white/10 bg-black/80 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur-md">
                      VAR_{idx + 1}
                    </div>
                    <a
                      href={img}
                      download
                      target="_blank"
                      aria-label={`Download variation ${idx + 1}`}
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white text-black transition-all duration-fast hover:bg-white/90"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[400px] flex-col items-center justify-center space-y-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.02]">
                  <ImageIcon size={32} className="text-white/10" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Waiting for Commands
                  </p>
                  <p className="mt-2 max-w-[240px] font-mono text-[11px] uppercase tracking-tight text-white/20">
                    Configure technical parameters to start asset generation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
