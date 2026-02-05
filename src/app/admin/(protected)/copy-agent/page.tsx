'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import { generateProjectCopy } from './actions';
import { Loader2, Copy, Check, PenTool } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const initialState = {
  success: false,
  content: '',
  error: '',
};

export default function CopyAgentPage() {
  const [state, formAction, isPending] = useActionState(
    generateProjectCopy,
    initialState
  );
  const [copied, setCopied] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(files);
  };

  const handleCopy = () => {
    if (state.content) {
      navigator.clipboard.writeText(state.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
            <PenTool size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Copy <span className="text-indigo-400">Agent</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Gere textos de alta performance para seus projetos de portfólio
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Column */}
            <div className="space-y-6">
              <form
                action={formAction}
                className="space-y-4"
                encType="multipart/form-data"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="context"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Contexto do Projeto
                  </label>
                  <textarea
                    id="context"
                    name="context"
                    required
                    rows={12}
                    className="w-full rounded-lg bg-slate-950 border border-white/10 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                    placeholder={`Nome do Projeto:
Cliente:
Objetivo:
Conceito Visual:
Público Alvo:
Desafios:`}
                  />
                  <p className="text-xs text-slate-500">
                    Quanto mais detalhes sobre a intenção e o conceito, melhor o
                    resultado.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="referenceImages"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Imagens de Referência (Opcional)
                  </label>
                  <input
                    id="referenceImages"
                    name="referenceImages"
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    multiple
                    onChange={handleImagesChange}
                    className="block w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-500/20 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-indigo-300 hover:file:bg-indigo-500/30 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    aria-describedby="referenceImages-help"
                  />
                  <p
                    id="referenceImages-help"
                    className="text-xs text-slate-500"
                  >
                    Envie até 4 imagens (PNG, JPG, WEBP ou GIF, máximo de 8MB
                    cada) para o agent considerar o visual na escrita.
                  </p>
                  {selectedImages.length > 0 && (
                    <ul className="rounded-lg border border-white/5 bg-slate-950/50 p-3 text-xs text-slate-400 space-y-1 max-h-32 overflow-y-auto">
                      {selectedImages.map((file) => (
                        <li key={`${file.name}-${file.lastModified}`}>
                          {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{' '}
                          MB)
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando Copy...
                    </>
                  ) : (
                    'Gerar Copy do Projeto'
                  )}
                </button>
              </form>

              {state.error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {state.error}
                </div>
              )}
            </div>

            {/* Output Column */}
            <div className="bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden flex flex-col min-h-[500px]">
              <div className="border-b border-white/5 bg-slate-900/50 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Resultado
                </span>
                {state.content && (
                  <button
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white transition-colors"
                    title="Copiar Markdown"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                )}
              </div>

              <div className="flex-1 p-6 overflow-y-auto max-h-[700px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {state.content ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-indigo-300 prose-a:text-indigo-400">
                    <ReactMarkdown>{state.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Copy size={20} />
                    </div>
                    <p className="text-sm">O resultado aparecerá aqui.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
