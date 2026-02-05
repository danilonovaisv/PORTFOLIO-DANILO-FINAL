'use client';

import { useActionState } from 'react';
import { generateAdScenes } from './actions';
import { AI_MODELS, normalizeAIModels } from './types';
import { Loader2, ImageIcon, Download, Sparkles } from 'lucide-react';
import Image from 'next/image';

const initialState = {
  success: false,
  images: [] as string[],
  error: '',
};

export default function SceneGeneratorPage() {
  const [state, formAction, isPending] = useActionState(
    generateAdScenes,
    initialState
  );
  const modelOptions = normalizeAIModels(AI_MODELS);
  const defaultModelId =
    modelOptions.find((model) => model.id === 'dall-e-3' && model.available)
      ?.id ?? modelOptions.find((model) => model.available)?.id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
            <ImageIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Scene <span className="text-emerald-400">Generator</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Crie visualizações de contexto fotorrealistas para suas peças
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-1 space-y-6">
              <form action={formAction} className="space-y-4">
                {/* AI Model Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Modelo de IA
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {modelOptions.length > 0 ? (
                      modelOptions.map((model) => (
                        <label
                          key={model.id}
                          className={`relative flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                            model.available
                              ? 'border-white/10 hover:border-emerald-500/50 hover:bg-white/5'
                              : 'border-white/5 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <input
                            type="radio"
                            name="model"
                            value={model.id}
                            defaultChecked={model.id === defaultModelId}
                            disabled={!model.available}
                            className="sr-only peer"
                          />
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center peer-checked:bg-emerald-500/20 peer-checked:text-emerald-400 transition-colors">
                            <Sparkles size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {model.name}
                              </span>
                              {!model.available && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                                  Em breve
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                              {model.description}
                            </p>
                          </div>
                          <div className="absolute inset-0 rounded-lg ring-2 ring-emerald-500 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </label>
                      ))
                    ) : (
                      <>
                        <input type="hidden" name="model" value="dall-e-3" />
                        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
                          Não foi possível carregar os modelos de IA. O sistema
                          usará DALL-E 3 como fallback.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Arte Original Dropzone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Arte Original (Referência)
                  </label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer">
                    <ImageIcon className="h-8 w-8 text-slate-500 mb-2" />
                    <span className="text-xs text-slate-500">
                      Upload da peça (Opcional)
                    </span>
                  </div>
                </div>

                {/* Piece Type */}
                <div className="space-y-2">
                  <label
                    htmlFor="pieceType"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Tipo de Peça
                  </label>
                  <select
                    id="pieceType"
                    name="pieceType"
                    className="w-full rounded-lg bg-slate-950 border border-white/10 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Instagram Post">
                      Instagram Post (Social)
                    </option>
                    <option value="Outdoor Billboard">
                      Outdoor / Painel Urbano
                    </option>
                    <option value="Business Card">Cartão de Visita</option>
                    <option value="Poster">Cartaz / Poster</option>
                    <option value="Product Packaging">
                      Embalagem de Produto
                    </option>
                    <option value="Website Interface">
                      Interface Web (Monitor)
                    </option>
                  </select>
                </div>

                {/* Scene Description */}
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Descrição da Cena
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    className="w-full rounded-lg bg-slate-950 border border-white/10 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                    placeholder="Ex: Celular moderno sobre uma mesa de mármore em um café bem iluminado..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Cenas...
                    </>
                  ) : (
                    'Gerar 3 Variações'
                  )}
                </button>
              </form>

              {state.error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {state.error}
                </div>
              )}
            </div>

            {/* Gallery Column */}
            <div className="lg:col-span-2 bg-slate-950/50 rounded-xl border border-white/5 p-6 min-h-[500px]">
              {state.images && state.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First image large */}
                  <div className="md:col-span-2 aspect-video relative group rounded-lg overflow-hidden border border-white/10 bg-black">
                    <Image
                      src={state.images[0]}
                      alt="Cena 1"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                      Wide Shot
                    </div>
                    <a
                      href={state.images[0]}
                      download
                      target="_blank"
                      aria-label="Download Wide Shot"
                      className="absolute bottom-4 right-4 p-2 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Download size={16} />
                    </a>
                  </div>

                  {/* Other images smaller */}
                  {state.images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square relative group rounded-lg overflow-hidden border border-white/10 bg-black"
                    >
                      <Image
                        src={img}
                        alt={`Cena ${idx + 2}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white">
                        {idx === 0 ? 'Medium Shot' : 'Close Up'}
                      </div>
                      <a
                        href={img}
                        download
                        target="_blank"
                        aria-label={`Download ${idx === 0 ? 'Medium Shot' : 'Close Up'}`}
                        className="absolute bottom-4 right-4 p-2 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <ImageIcon size={32} />
                  </div>
                  <div className="text-center max-w-sm">
                    <p className="text-sm text-slate-400 mb-1">
                      Nenhuma cena gerada ainda.
                    </p>
                    <p className="text-xs text-slate-600">
                      Preencha o formulário para criar visualizações
                      fotorrealistas.
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
