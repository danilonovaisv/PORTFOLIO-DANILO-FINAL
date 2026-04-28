'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import { generateProjectCopy } from '@/app/admin/(protected)/copy-agent/actions';
import { Loader2, Copy, Check } from 'lucide-react';
import { GhostMarkdown } from '@/components/ui/GhostMarkdown';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import {
  COPY_FIELD_LIMITS,
  MAX_REFERENCE_IMAGES,
  type CopyInput,
} from '@/lib/admin/schemas/copy-agent';

const initialState = {
  success: false,
  content: '',
  fallbackContent: '',
  aiGenerated: undefined as boolean | undefined,
  error: '',
  notice: '',
  fieldErrors: {} as Record<string, string | undefined>,
};

export default function CopyAgentPage() {
  const [state, formAction, isPending] = useActionState(
    generateProjectCopy,
    initialState
  );
  const [copied, setCopied] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [outputType, setOutputType] =
    useState<CopyInput['outputType']>('landing');
  const fieldErrors = state.fieldErrors ?? {};
  const inputClass = (hasError: boolean) =>
    `w-full rounded border px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white placeholder:text-white/10 outline-none transition-all duration-300 ${
      hasError
        ? 'border-red-500/50 bg-red-500/[0.02] focus:border-red-500'
        : 'border-white/10 bg-black/40 focus:border-indigo-500/50'
    }`;

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(files);
  };

  const displayContent = state.content || state.fallbackContent || '';

  const handleCopy = () => {
    if (displayContent) {
      navigator.clipboard.writeText(displayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Standard v3.0 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-tighter text-white">
            Copy <span className="text-indigo-400">Agent</span>
          </h1>
          <div className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            v3.0 AI
          </div>
        </div>
        <p className="max-w-2xl font-mono text-[11px] uppercase tracking-wider text-white/40">
          High-performance narrative generation for portfolio cases.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Input Column */}
        <div className="space-y-8 lg:col-span-5">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
            <h2 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500/70">
              System_Narrative_Parameters
            </h2>
            <form
              action={formAction}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Output_Type"
                    description="Choose between Full Landing Page (V3 ALPA) or a concise Post/Pop-up (Modal)."
                    className="flex items-center gap-1"
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <label
                      className={`cursor-pointer rounded border px-4 py-3 transition-all duration-300 ${
                        outputType === 'landing'
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                          : 'border-white/5 bg-white/[0.01] text-white/40 hover:border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="outputType"
                        value="landing"
                        className="sr-only"
                        checked={outputType === 'landing'}
                        onChange={() => setOutputType('landing')}
                      />
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-tight">
                        Full Landing Page
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-tight opacity-50">
                        V3 ALPHA Structure
                      </span>
                    </label>
                    <label
                      className={`cursor-pointer rounded border px-4 py-3 transition-all duration-300 ${
                        outputType === 'modal'
                          ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                          : 'border-white/5 bg-white/[0.01] text-white/40 hover:border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="outputType"
                        value="modal"
                        className="sr-only"
                        checked={outputType === 'modal'}
                        onChange={() => setOutputType('modal')}
                      />
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-tight">
                        Simple Post (Modal)
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-tight opacity-50">
                        Concise_Summary
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Project_Name"
                    description="Use the official name so the final copy respects branding and consistency."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="projectName"
                    name="projectName"
                    required
                    minLength={COPY_FIELD_LIMITS.projectName.min}
                    maxLength={COPY_FIELD_LIMITS.projectName.max}
                    className={inputClass(Boolean(fieldErrors.projectName))}
                    placeholder="Ex: Rebranding Orion Systems"
                  />
                  {fieldErrors.projectName && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.projectName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Client"
                    description="Company/brand name to contextualize tone and positioning."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="clientName"
                    name="clientName"
                    required
                    minLength={COPY_FIELD_LIMITS.clientName.min}
                    maxLength={COPY_FIELD_LIMITS.clientName.max}
                    className={inputClass(Boolean(fieldErrors.clientName))}
                    placeholder="Ex: Orion Systems"
                  />
                  {fieldErrors.clientName && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.clientName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Objective"
                    description="Explain the strategic problem the project needs to solve."
                    className="flex items-center gap-1"
                  />
                  <textarea
                    id="objective"
                    name="objective"
                    required
                    rows={3}
                    minLength={COPY_FIELD_LIMITS.objective.min}
                    maxLength={COPY_FIELD_LIMITS.objective.max}
                    className={`${inputClass(Boolean(fieldErrors.objective))} resize-none`}
                    placeholder="Ex: Reposition the brand for the enterprise segment without losing innovation perception."
                  />
                  {fieldErrors.objective && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.objective}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Target_Audience"
                    description="Who must connect with the case narrative."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="targetAudience"
                    name="targetAudience"
                    required
                    minLength={COPY_FIELD_LIMITS.targetAudience.min}
                    maxLength={COPY_FIELD_LIMITS.targetAudience.max}
                    className={inputClass(Boolean(fieldErrors.targetAudience))}
                    placeholder="Ex: B2B marketing directors and technology decision makers."
                  />
                  {fieldErrors.targetAudience && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.targetAudience}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Visual_Concept"
                    description="Primary creative direction, language, rhythm and aesthetic universe."
                    className="flex items-center gap-1"
                  />
                  <textarea
                    id="visualConcept"
                    name="visualConcept"
                    required
                    rows={3}
                    minLength={COPY_FIELD_LIMITS.visualConcept.min}
                    maxLength={COPY_FIELD_LIMITS.visualConcept.max}
                    className={`${inputClass(Boolean(fieldErrors.visualConcept))} resize-none`}
                    placeholder="Ex: Modular system with high contrast, condensed typography and silent presence."
                  />
                  {fieldErrors.visualConcept && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.visualConcept}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Challenges"
                    description="List constraints, scope conflicts or critical execution points."
                    className="flex items-center gap-1"
                  />
                  <textarea
                    id="keyChallenges"
                    name="keyChallenges"
                    required
                    rows={3}
                    minLength={COPY_FIELD_LIMITS.keyChallenges.min}
                    maxLength={COPY_FIELD_LIMITS.keyChallenges.max}
                    className={`${inputClass(Boolean(fieldErrors.keyChallenges))} resize-none`}
                    placeholder="Ex: Harmonizing premium language with short deadlines and multiple touchpoints."
                  />
                  {fieldErrors.keyChallenges && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.keyChallenges}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Deliverables (optional)"
                    description="Short list of what was produced."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="deliverables"
                    name="deliverables"
                    maxLength={COPY_FIELD_LIMITS.deliverables.max}
                    className={inputClass(Boolean(fieldErrors.deliverables))}
                    placeholder="Ex: Brand system, key visual, guideline, digital assets"
                  />
                  {fieldErrors.deliverables && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.deliverables}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_Tone_Of_Voice (optional)"
                    description="Voice directive for text output (editorial, technical, emotional, etc.)."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="toneOfVoice"
                    name="toneOfVoice"
                    maxLength={COPY_FIELD_LIMITS.toneOfVoice.max}
                    className={inputClass(Boolean(fieldErrors.toneOfVoice))}
                    placeholder="Ex: Editorial, sophisticated and concise"
                  />
                  {fieldErrors.toneOfVoice && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.toneOfVoice}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <FieldTooltip
                    label="System_YouTube_Link (optional)"
                    description="If the project has a primary video, the agent will attempt to read subtitles for extra context."
                    className="flex items-center gap-1"
                  />
                  <input
                    id="youtubeUrl"
                    name="youtubeUrl"
                    type="url"
                    maxLength={COPY_FIELD_LIMITS.youtubeUrl.max}
                    className={inputClass(Boolean(fieldErrors.youtubeUrl))}
                    placeholder="HTTPS://YOUTUBE.COM/WATCH?V=..."
                  />
                  {fieldErrors.youtubeUrl && (
                    <p className="text-xs text-red-300">
                      {fieldErrors.youtubeUrl}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <FieldTooltip
                  label="System_Reference_Images (optional)"
                  description={`Up to ${MAX_REFERENCE_IMAGES} images to guide visual direction and narrative tone.`}
                  className="flex items-center gap-1"
                />
                <input
                  id="referenceImages"
                  name="referenceImages"
                  title="Upload Reference Images"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  multiple
                  onChange={handleImagesChange}
                  className="block w-full rounded border border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white file:mr-3 file:rounded file:border-0 file:bg-indigo-500/20 file:px-3 file:py-1 file:font-mono file:text-[9px] file:uppercase file:tracking-widest file:text-indigo-300 hover:file:bg-indigo-500/30 outline-none transition-all"
                />
                <p className="font-mono text-[9px] uppercase tracking-tight text-white/20">
                  Send up to {MAX_REFERENCE_IMAGES} images · Max 8MB/each
                </p>
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

              <button
                type="submit"
                disabled={isPending}
                className="group relative flex w-full items-center justify-center overflow-hidden rounded bg-indigo-500 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>PROCESSING_COPY_STREAM</span>
                  </div>
                ) : (
                  <span>GENERATE_NARRATIVE_STREAM</span>
                )}
              </button>
            </form>

            {state.error && (
              <div className="rounded border border-red-500/20 bg-red-500/10 p-4 font-mono text-[10px] uppercase tracking-tight text-red-400">
                <p className="font-bold">ERROR_LOG:</p>
                <p className="mt-1">{state.error}</p>
              </div>
            )}

            {state.notice && (
              <div className="rounded border border-amber-500/20 bg-amber-500/10 p-4 font-mono text-[10px] uppercase tracking-tight text-amber-300">
                <p className="font-bold">NOTICE_LOG:</p>
                <p className="mt-1">{state.notice}</p>
              </div>
            )}
          </div>
        </div>

        {/* Output Column */}
        <div className="min-h-[600px] lg:col-span-7">
          <div className="h-full flex flex-col rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
              <div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Output Visualization
                </h3>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-white">
                  Markdown Result
                </p>
              </div>

              {displayContent && (
                <div className="flex items-center gap-4">
                  {state.aiGenerated === false && (
                    <div className="border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-amber-400">
                      Draft_Mode
                    </div>
                  )}
                  <button
                    onClick={handleCopy}
                    className="flex h-8 w-8 items-center justify-center rounded border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-95"
                    title="Copy Markdown"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 p-8 overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {displayContent ? (
                <GhostMarkdown
                  content={displayContent}
                  proseClassName="prose-invert prose-sm max-w-none prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-widest prose-headings:text-indigo-400 prose-p:font-mono prose-p:text-white/60 prose-strong:text-white"
                />
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center space-y-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/[0.02]">
                    <Copy size={24} className="text-white/10" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Awaiting Processing
                    </p>
                    <p className="mt-2 max-w-[200px] font-mono text-[11px] uppercase tracking-tight text-white/20">
                      The narrative result will appear in this technical zone.
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
