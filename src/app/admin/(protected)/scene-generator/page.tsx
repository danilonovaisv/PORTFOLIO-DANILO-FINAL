'use client';

import {
  useActionState,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';
import { generateAdScenes } from './actions';
import {
  AI_MODELS,
  OUTPUT_RATIO_PRESETS,
  normalizeAIModels,
  type OutputRatio,
} from './types';
import { Loader2, ImageIcon, Download, Sparkles, UploadCloud } from 'lucide-react';
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

  const modelOptions = normalizeAIModels(AI_MODELS);
  const defaultModelId =
    modelOptions.find((model) => model.id === 'dall-e-3' && model.available)
      ?.id ?? modelOptions.find((model) => model.available)?.id;

  const handleFilesSelection = (files: FileList | null) => {
    if (!files) return;
    setSelectedImages(Array.from(files).slice(0, 8));
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
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
            <ImageIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Scene <span className="text-emerald-400">Generator Pro</span>
            </h1>
            <p className="text-sm text-slate-400">
              Multi-upload, batch control e presets de ratio para cenas
              fotorrealistas
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-slate-900/50 p-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <form action={formAction} className="space-y-5">
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
                          className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                            model.available
                              ? 'border-white/10 hover:border-emerald-500/50 hover:bg-white/5'
                              : 'cursor-not-allowed border-white/5 opacity-50'
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
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 transition-colors peer-checked:bg-emerald-500/20 peer-checked:text-emerald-400">
                            <Sparkles size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {model.name}
                              </span>
                              {!model.available && (
                                <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-400">
                                  Em breve
                                </span>
                              )}
                            </div>
                            <p className="truncate text-xs text-slate-500">
                              {model.description}
                            </p>
                          </div>
                          <div className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-emerald-500 opacity-0 transition-opacity peer-checked:opacity-100" />
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
                    description="Arraste múltiplos arquivos (até 8) para orientar iluminação, estilo e contexto."
                    className="flex items-center gap-1"
                  />
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-lg border-2 border-dashed border-white/15 p-5 text-center transition-colors hover:bg-white/5"
                  >
                    <UploadCloud className="mx-auto mb-2 h-8 w-8 text-slate-500" />
                    <p className="text-xs text-slate-400">
                      Clique ou arraste imagens para upload
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      PNG, JPG, WEBP, GIF · máximo 8MB por arquivo
                    </p>
                    <input
                      ref={fileInputRef}
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
                    <ul className="max-h-32 space-y-1 overflow-y-auto rounded-lg border border-white/5 bg-slate-950/50 p-3 text-xs text-slate-400">
                      {selectedImages.map((file) => (
                        <li key={`${file.name}-${file.lastModified}`}>
                          {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
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
                    min={1}
                    max={4}
                    name="batchSize"
                    value={batchSize}
                    onChange={(event) => setBatchSize(Number(event.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <p className="text-xs text-slate-400">{batchSize} variações</p>
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
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                          outputRatio === ratio.id
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                            : 'border-white/10 text-slate-300 hover:bg-white/5'
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
                        <span className="block font-semibold">{ratio.id}</span>
                        <span className="text-[11px] text-slate-500">
                          {ratio.description}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="Tipo de Peça"
                    description="Contexto do mockup para guiar escala e ambiente da cena."
                    className="flex items-center gap-1"
                  />
                  <select
                    id="pieceType"
                    name="pieceType"
                    className="w-full rounded-lg border border-white/10 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Instagram Post">Instagram Post (Social)</option>
                    <option value="Outdoor Billboard">Outdoor / Painel Urbano</option>
                    <option value="Business Card">Cartão de Visita</option>
                    <option value="Poster">Cartaz / Poster</option>
                    <option value="Product Packaging">Embalagem de Produto</option>
                    <option value="Website Interface">Interface Web (Monitor)</option>
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
                    className="w-full resize-none rounded-lg border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Ex: Smartphone premium sobre mesa de mármore em cafeteria com luz natural lateral..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando {batchSize} cena(s)...
                    </>
                  ) : (
                    `Gerar ${batchSize} variação(ões)`
                  )}
                </button>
              </form>

              {state.error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {state.error}
                </div>
              )}
            </div>

            <div className="min-h-[500px] rounded-xl border border-white/5 bg-slate-950/50 p-6 lg:col-span-2">
              {state.images && state.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {state.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`${idx === 0 ? 'md:col-span-2' : ''} ${ratioPreviewClass[previewAspect]} group relative overflow-hidden rounded-lg border border-white/10 bg-black`}
                    >
                      <Image
                        src={img}
                        alt={`Cena ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white backdrop-blur">
                        Variação {idx + 1}
                      </div>
                      <a
                        href={img}
                        download
                        target="_blank"
                        aria-label={`Download variação ${idx + 1}`}
                        className="absolute bottom-3 right-3 rounded-full bg-white p-2 text-black opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-slate-600">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <ImageIcon size={32} />
                  </div>
                  <div className="max-w-sm text-center">
                    <p className="mb-1 text-sm text-slate-400">
                      Nenhuma cena gerada ainda.
                    </p>
                    <p className="text-xs text-slate-600">
                      Configure o formulário para gerar mockups com batch e
                      ratio personalizados.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
