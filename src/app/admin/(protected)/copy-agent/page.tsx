'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import { generateProjectCopy } from './actions';
import { Loader2, Copy, Check, PenTool } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FieldTooltip } from '@/components/admin/FieldTooltip';

const initialState = {
  success: false,
  content: '',
  error: '',
  fieldErrors: {} as Record<string, string | undefined>,
};

export default function CopyAgentPage() {
  const [state, formAction, isPending] = useActionState(
    generateProjectCopy,
    initialState
  );
  const [copied, setCopied] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fieldErrors = state.fieldErrors ?? {};
  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all ${
      hasError
        ? 'border-red-400/70 bg-red-500/5 focus:border-red-400 focus:ring-1 focus:ring-red-400'
        : 'border-white/10 bg-slate-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
    }`;

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
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <FieldTooltip
                      label="Nome do Projeto"
                      description="Use o nome oficial para o texto final respeitar branding e consistência."
                      className="flex items-center gap-1"
                    />
                    <input
                      id="projectName"
                      name="projectName"
                      required
                      className={inputClass(Boolean(fieldErrors.projectName))}
                      placeholder="Ex: Rebranding Orion Systems"
                    />
                    {fieldErrors.projectName && (
                      <p className="text-xs text-red-300">{fieldErrors.projectName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Cliente"
                      description="Nome da empresa/marca para contextualizar tom e posicionamento."
                      className="flex items-center gap-1"
                    />
                    <input
                      id="clientName"
                      name="clientName"
                      required
                      className={inputClass(Boolean(fieldErrors.clientName))}
                      placeholder="Ex: Orion Systems"
                    />
                    {fieldErrors.clientName && (
                      <p className="text-xs text-red-300">{fieldErrors.clientName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Objetivo"
                      description="Explique o problema estratégico que o projeto precisa resolver."
                      className="flex items-center gap-1"
                    />
                    <textarea
                      id="objective"
                      name="objective"
                      required
                      rows={3}
                      className={`${inputClass(Boolean(fieldErrors.objective))} resize-none`}
                      placeholder="Ex: Reposicionar a marca para o segmento enterprise sem perder percepção de inovação."
                    />
                    {fieldErrors.objective && (
                      <p className="text-xs text-red-300">{fieldErrors.objective}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Público-alvo"
                      description="Quem deve se conectar com a narrativa do case."
                      className="flex items-center gap-1"
                    />
                    <input
                      id="targetAudience"
                      name="targetAudience"
                      required
                      className={inputClass(Boolean(fieldErrors.targetAudience))}
                      placeholder="Ex: Diretores de marketing B2B e tomadores de decisão em tecnologia."
                    />
                    {fieldErrors.targetAudience && (
                      <p className="text-xs text-red-300">{fieldErrors.targetAudience}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Conceito Visual"
                      description="Direção criativa principal, linguagem, ritmo e universo estético."
                      className="flex items-center gap-1"
                    />
                    <textarea
                      id="visualConcept"
                      name="visualConcept"
                      required
                      rows={3}
                      className={`${inputClass(Boolean(fieldErrors.visualConcept))} resize-none`}
                      placeholder="Ex: Sistema modular com contraste alto, tipografia condensada e presença silenciosa."
                    />
                    {fieldErrors.visualConcept && (
                      <p className="text-xs text-red-300">{fieldErrors.visualConcept}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Desafios"
                      description="Liste limitações, conflitos de escopo ou pontos críticos de execução."
                      className="flex items-center gap-1"
                    />
                    <textarea
                      id="keyChallenges"
                      name="keyChallenges"
                      required
                      rows={3}
                      className={`${inputClass(Boolean(fieldErrors.keyChallenges))} resize-none`}
                      placeholder="Ex: Harmonizar linguagem premium com prazos curtos e múltiplos touchpoints."
                    />
                    {fieldErrors.keyChallenges && (
                      <p className="text-xs text-red-300">{fieldErrors.keyChallenges}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Entregáveis (opcional)"
                      description="Lista curta do que foi produzido."
                      className="flex items-center gap-1"
                    />
                    <input
                      id="deliverables"
                      name="deliverables"
                      className={inputClass(Boolean(fieldErrors.deliverables))}
                      placeholder="Ex: Brand system, key visual, guideline, assets digitais"
                    />
                    {fieldErrors.deliverables && (
                      <p className="text-xs text-red-300">{fieldErrors.deliverables}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldTooltip
                      label="Tom desejado (opcional)"
                      description="Diretriz de voz para saída textual (editorial, técnico, emocional, etc.)."
                      className="flex items-center gap-1"
                    />
                    <input
                      id="toneOfVoice"
                      name="toneOfVoice"
                      className={inputClass(Boolean(fieldErrors.toneOfVoice))}
                      placeholder="Ex: Editorial, sofisticado e conciso"
                    />
                    {fieldErrors.toneOfVoice && (
                      <p className="text-xs text-red-300">{fieldErrors.toneOfVoice}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="Imagens de Referência (opcional)"
                    description="Até 4 imagens para orientar direção visual e tom narrativo."
                    className="flex items-center gap-1"
                  />
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
