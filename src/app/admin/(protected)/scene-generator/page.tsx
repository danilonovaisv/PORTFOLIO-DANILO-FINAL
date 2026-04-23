'use client';

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
    <div className="space-y-8">
      {/* Header Standard v3.0 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tighter text-white">
            Scene <span className="text-emerald-500">Generator</span>
          </h1>
          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            v3.0 PRO
          </div>
        </div>
        <p className="max-w-2xl font-mono text-[11px] uppercase tracking-wider text-white/40">
          Gerador fotorrealista de mockups com controle de batch, ratio e referências visuais.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Settings Column */}
        <div className="space-y-8 lg:col-span-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
            <h2 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/70">
              Configurações Técnicas
            </h2>
              <form
                action={formAction}
                className="space-y-5"
                encType="multipart/form-data"
              >
                <div className="space-y-2">
                  <FieldTooltip
                    label="Modelo de IA"
                    description="Selecione o modelo ativo para geração. Modelos indisponíveis ficam bloqueados."
                    className="flex items-center gap-1"
                  />
                  <div className="grid grid-cols-1 gap-2">
                    {modelOptions.length > 0 ? (
                      modelOptions.map((model) => (
                        <label
                          key={model.id}
                          className={`relative flex cursor-pointer items-center gap-3 rounded border p-3 transition-all duration-300 ${
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
                          Não foi possível carregar os modelos. DALL-E 3 será
                          usado como fallback.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="Referências Visuais"
                    description={`Arraste múltiplos arquivos (até ${MAX_REFERENCE_IMAGES}) para orientar iluminação, estilo e contexto.`}
                    className="flex items-center gap-1"
                  />
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="group cursor-pointer rounded border border-dashed border-white/10 bg-white/[0.01] p-6 text-center transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]"
                  >
                    <UploadCloud className="mx-auto mb-3 h-6 w-6 text-white/20 transition-colors group-hover:text-emerald-500/50" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60">
                      Upload Referências
                    </p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-tight text-white/20">
                      PNG, JPG, WEBP · Máx 8MB
                    </p>
                    <input
                      ref={fileInputRef}
                      title="Upload imagens de referência"
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
                        <li key={`${file.name}-${file.lastModified}`} className="flex justify-between">
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
                    description="Quantidade de variações geradas por execução (1 a 4)."
                    className="flex items-center gap-1"
                  />
                  <input
                    type="range"
                    title="Quantidade de variações (Batch size)"
                    min={1}
                    max={4}
                    name="batchSize"
                    value={batchSize}
                    onChange={(event) =>
                      setBatchSize(Number(event.target.value))
                    }
                    className="w-full accent-emerald-500 bg-white/5 h-1 rounded-full appearance-none cursor-pointer"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-500/70">
                    {batchSize} VARIATIONS_STK
                  </p>
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="Output Ratio"
                    description="Preset de aspecto para o render final. O payload envia esse valor de forma estruturada."
                    className="flex items-center gap-1"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {OUTPUT_RATIO_PRESETS.map((ratio) => (
                      <label
                        key={ratio.id}
                        className={`cursor-pointer rounded border px-3 py-2 text-left transition-all duration-300 ${
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
                    description="Contexto do mockup para guiar escala e ambiente da cena."
                    className="flex items-center gap-1"
                  />
                  <select
                    id="pieceType"
                    name="pieceType"
                    title="Packaging or support type for the scene"
                    className="w-full rounded border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white outline-none transition-all focus:border-emerald-500/50"
                  >
                    {SCENE_CATEGORIES.map((category) => (
                      <optgroup key={category.value} label={category.label} className="bg-neutral-900">
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
                    label="Descrição da Cena"
                    description="Descrição textual principal para composição, luz e narrativa visual."
                    className="flex items-center gap-1"
                  />
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="w-full resize-none rounded border border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white placeholder:text-white/10 outline-none transition-all focus:border-emerald-500/50"
                    placeholder="DESCREVA A CENA... (EX: SMARTPHONE PREMIUM, MÁRMORE, LUZ NATURAL)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-emerald-500 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>PROCESSANDO_{batchSize}_STK</span>
                    </div>
                  ) : (
                    <span>GERAR_VARIACOES_STK ({batchSize})</span>
                  )}
                </button>
              </form>

              {state.error && (
                <div className="rounded border border-red-500/20 bg-red-500/10 p-4 font-mono text-[10px] uppercase tracking-tight text-red-400">
                  <p className="font-bold">ERROR_LOG:</p>
                  <p className="mt-1">{state.error}</p>
                  {state.supportCode && (
                    <p className="mt-2 opacity-50">
                      CODE: {state.supportCode}
                    </p>
                  )}
                </div>
              )}

              {isCapabilitiesLoading && (
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                  SYSTEM_LOADING_MODEL_AVAILABILITY...
                </p>
              )}
            </div>

        {/* Preview Column */}
        <div className="min-h-[600px] lg:col-span-8">
          <div className="h-full rounded-xl border border-white/5 bg-white/[0.01] p-8 backdrop-blur-sm">
            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
              <div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Visualização da Saída
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white">
                  Resultados da Geração
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
                    className={`${idx === 0 ? 'md:col-span-2' : ''} ${ratioPreviewClass[previewAspect]} group relative overflow-hidden rounded border border-white/10 bg-black/40 transition-all duration-500 hover:border-emerald-500/30`}
                  >
                    <Image
                      src={img}
                      alt={`Cena ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute left-4 top-4 border border-white/10 bg-black/80 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white backdrop-blur-md">
                      VAR_{idx + 1}
                    </div>
                    <a
                      href={img}
                      download
                      target="_blank"
                      aria-label={`Download variação ${idx + 1}`}
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white text-black transition-all duration-300 hover:scale-110 active:scale-95"
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
                    Aguardando Comandos
                  </p>
                  <p className="mt-2 max-w-[240px] font-mono text-[11px] uppercase tracking-tight text-white/20">
                    Configure os parâmetros técnicos ao lado para iniciar a geração de ativos.
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
