'use client';

import {
  ArrowDown,
  ArrowUp,
  Columns2,
  Image as ImageIcon,
  Plus,
  Quote,
  Trash2,
  Type,
  Video,
} from 'lucide-react';
import type { ComponentType } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { BlockType, LandingPageBlock } from '@/types/landing-page';
import type {
  MasterProjectAsset,
  MasterProjectTemplateV3Data,
} from '@/types/project-template';

const YOUTUBE_PATTERN =
  /(youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i;

export type MasterProjectV3AssetDraft = MasterProjectAsset & {
  file?: File | null;
  previewUrl?: string;
};

export type MasterProjectV3GalleryDraft = LandingPageBlock;

export type MasterProjectTemplateV3Draft = Omit<
  MasterProjectTemplateV3Data,
  'hero_cover_image' | 'hero_logo_image' | 'gallery_grid'
> & {
  hero_cover_image?: MasterProjectV3AssetDraft;
  hero_logo_image?: MasterProjectV3AssetDraft;
  gallery_grid: MasterProjectV3GalleryDraft[];
};

type MasterProjectTemplateV3EditorProps = {
  value: MasterProjectTemplateV3Draft;
  onChange: (_next: MasterProjectTemplateV3Draft) => void;
};

const inputClasses =
  'w-full border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-blue-500';
const labelClasses = 'text-[11px] uppercase tracking-[0.15em] text-slate-400';

const splitTokenList = (value: string): string[] =>
  value
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const splitLines = (value: string): string[] =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const blockLabelMap: Record<BlockType, string> = {
  text: 'Texto Puro',
  image: 'Imagem Full',
  video: 'Vídeo Full',
  'video-autoplay': 'Vídeo Autoplay (Loop)',
  'image-text': 'Imagem + Texto',
  'text-image': 'Texto + Imagem',
  'image-image': 'Imagem Dupla (Grid)',
  'image-video': 'Imagem + Vídeo',
  'video-text': 'Vídeo + Texto',
  'quote-band': 'Faixa de Citação (Full)',
};

type BlockPreset = {
  type: BlockType;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const BASIC_PRESETS: BlockPreset[] = [
  { type: 'text', label: 'Texto Puro', icon: Type },
  { type: 'image', label: 'Imagem Full', icon: ImageIcon },
  { type: 'video', label: 'Vídeo Full', icon: Video },
  { type: 'video-autoplay', label: 'Vídeo Autoplay (Loop)', icon: Video },
  { type: 'quote-band', label: 'Faixa de Citação (Full)', icon: Quote },
];

const COMPOSITION_PRESETS: BlockPreset[] = [
  { type: 'image-text', label: 'Imagem + Texto', icon: ImageIcon },
  { type: 'text-image', label: 'Texto + Imagem', icon: Type },
  { type: 'image-image', label: 'Imagem Dupla (Grid)', icon: Columns2 },
  { type: 'image-video', label: 'Imagem + Vídeo', icon: ImageIcon },
  { type: 'video-text', label: 'Vídeo + Texto', icon: Video },
];

const createBlockDraft = (
  type: BlockType,
  index: number
): LandingPageBlock => ({
  id: `block-${type}-${index + 1}`,
  type,
  content: {
    text: '',
    text2: '',
    media: '',
    media2: '',
    alt: '',
    alt2: '',
    poster: '',
    poster2: '',
    autoplay: type === 'video-autoplay',
    bandColor: type === 'quote-band' ? '#0048ff' : undefined,
  },
  file: null,
  file2: null,
  previewUrl: '',
  previewUrl2: '',
});

function isVideoMode(kind: 'image' | 'video', value?: string) {
  if (kind === 'video') return true;
  return Boolean(value && YOUTUBE_PATTERN.test(value));
}

function MediaAssetField({
  label,
  value,
  onChange,
  requireAlt = false,
}: {
  label: string;
  value: MasterProjectV3AssetDraft;
  onChange: (_next: MasterProjectV3AssetDraft) => void;
  requireAlt?: boolean;
}) {
  const isVideo = value.kind === 'video';
  const preview = value.previewUrl || value.src;
  const missingAlt = requireAlt && !isVideo && !value.alt?.trim();

  return (
    <div className="space-y-3 border border-white/10 bg-slate-950/30 p-4">
      <p className={labelClasses}>{label}</p>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className={labelClasses}>Tipo</span>
          <select
            className={inputClasses}
            value={value.kind || 'image'}
            onChange={(event) =>
              onChange({
                ...value,
                kind: event.target.value === 'video' ? 'video' : 'image',
              })
            }
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
          </select>
        </label>

        <label className="space-y-1">
          <span className={labelClasses}>Upload</span>
          <input
            className={`${inputClasses} file:mr-3 file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
            type="file"
            accept={isVideo ? 'video/*' : 'image/*'}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              onChange({
                ...value,
                file,
                previewUrl: URL.createObjectURL(file),
              });
            }}
          />
        </label>
      </div>

      <label className="space-y-1">
        <span className={labelClasses}>URL / Caminho</span>
        <input
          className={inputClasses}
          placeholder={
            isVideo
              ? 'landing-pages/meu-projeto/hero-video.mp4'
              : 'landing-pages/meu-projeto/hero.webp'
          }
          value={value.src || ''}
          onChange={(event) =>
            onChange({
              ...value,
              src: event.target.value,
              file: null,
              previewUrl: '',
            })
          }
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Texto alternativo</span>
        <input
          className={inputClasses}
          value={value.alt || ''}
          onChange={(event) => onChange({ ...value, alt: event.target.value })}
        />
      </label>

      {missingAlt ? (
        <p className="text-xs text-red-300">
          Alt text obrigatório para imagem.
        </p>
      ) : null}

      {isVideo ? (
        <label className="space-y-1">
          <span className={labelClasses}>Poster (opcional)</span>
          <input
            className={inputClasses}
            value={value.poster || ''}
            onChange={(event) =>
              onChange({ ...value, poster: event.target.value })
            }
          />
        </label>
      ) : null}

      {preview ? (
        <div className="overflow-hidden border border-white/10 bg-black/40">
          {isVideo ? (
            <video
              src={preview}
              className="h-56 w-full object-cover"
              controls
              muted
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={value.alt || 'Pré-visualização'}
              className="h-56 w-full object-cover"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

function BlockMediaField({
  block,
  mediaKey,
  altKey,
  posterKey,
  fileKey,
  previewKey,
  label,
  kind,
  onChange,
}: {
  block: LandingPageBlock;
  mediaKey: 'media' | 'media2';
  altKey: 'alt' | 'alt2';
  posterKey: 'poster' | 'poster2';
  fileKey: 'file' | 'file2';
  previewKey: 'previewUrl' | 'previewUrl2';
  label: string;
  kind: 'image' | 'video';
  onChange: (_next: LandingPageBlock) => void;
}) {
  const isVideo = isVideoMode(kind, block.content[mediaKey]);
  const preview = block[previewKey] || block.content[mediaKey];
  const missingAlt = !isVideo && !block.content[altKey]?.trim();

  return (
    <div className="space-y-2 border border-white/10 bg-slate-950/30 p-4">
      <p className={labelClasses}>{label}</p>

      <label className="space-y-1">
        <span className={labelClasses}>URL / Caminho</span>
        <input
          className={inputClasses}
          value={block.content[mediaKey] || ''}
          onChange={(event) =>
            onChange({
              ...block,
              [fileKey]: null,
              [previewKey]: '',
              content: {
                ...block.content,
                [mediaKey]: event.target.value,
              },
            })
          }
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Upload</span>
        <input
          type="file"
          className={`${inputClasses} file:mr-3 file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
          accept={isVideo ? 'video/*' : 'image/*'}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            onChange({
              ...block,
              [fileKey]: file,
              [previewKey]: URL.createObjectURL(file),
            });
          }}
        />
      </label>

      <label className="space-y-1">
        <span className={labelClasses}>Alt text (imagem)</span>
        <input
          className={inputClasses}
          value={block.content[altKey] || ''}
          onChange={(event) =>
            onChange({
              ...block,
              content: {
                ...block.content,
                [altKey]: event.target.value,
              },
            })
          }
        />
      </label>

      {missingAlt ? (
        <p className="text-xs text-red-300">
          Alt text obrigatório para imagens.
        </p>
      ) : null}

      {isVideo ? (
        <label className="space-y-1">
          <span className={labelClasses}>Poster (vídeo)</span>
          <input
            className={inputClasses}
            value={block.content[posterKey] || ''}
            onChange={(event) =>
              onChange({
                ...block,
                content: {
                  ...block.content,
                  [posterKey]: event.target.value,
                },
              })
            }
          />
        </label>
      ) : null}

      {preview ? (
        <div className="overflow-hidden border border-white/10 bg-black/40">
          {isVideo ? (
            <video
              src={preview}
              className="h-44 w-full object-cover"
              controls
              muted
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="h-44 w-full object-cover"
            />
          )}
        </div>
      ) : null}
    </div>
  );
}

export default function MasterProjectTemplateV3Editor({
  value,
  onChange,
}: MasterProjectTemplateV3EditorProps) {
  const update = (updates: Partial<MasterProjectTemplateV3Draft>) => {
    onChange({ ...value, ...updates });
  };

  const updateBlock = (id: string, updates: Partial<LandingPageBlock>) => {
    update({
      gallery_grid: value.gallery_grid.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      ),
    });
  };

  const removeBlock = (id: string) => {
    update({
      gallery_grid: value.gallery_grid.filter((block) => block.id !== id),
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= value.gallery_grid.length) return;

    const next = [...value.gallery_grid];
    [next[index], next[target]] = [next[target], next[index]];
    update({ gallery_grid: next });
  };

  const addBlock = (type: BlockType) => {
    update({
      gallery_grid: [
        ...value.gallery_grid,
        createBlockDraft(type, value.gallery_grid.length),
      ],
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4 border border-white/10 bg-slate-900/35 p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Base da Página (V3 ALPA)
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className={labelClasses}>Título do projeto</span>
            <input
              className={inputClasses}
              value={value.project_title}
              onChange={(event) =>
                update({ project_title: event.target.value })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Subtítulo</span>
            <input
              className={inputClasses}
              value={value.project_subtitle || ''}
              onChange={(event) =>
                update({ project_subtitle: event.target.value || '' })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Slug do projeto</span>
            <input
              className={inputClasses}
              value={value.project_slug}
              onChange={(event) => update({ project_slug: event.target.value })}
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Cliente</span>
            <input
              className={inputClasses}
              value={value.project_client || ''}
              onChange={(event) =>
                update({ project_client: event.target.value })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Ano</span>
            <input
              className={inputClasses}
              type="number"
              value={value.project_year || ''}
              onChange={(event) =>
                update({
                  project_year: event.target.value
                    ? Number(event.target.value)
                    : undefined,
                })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>
              Cor do tema (ALPA + Liquid Ether)
            </span>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-12 border border-white/10 bg-transparent"
                value={value.theme_color || '#0048ff'}
                onChange={(event) =>
                  update({ theme_color: event.target.value })
                }
                title="Cor do tema"
              />
              <input
                className={inputClasses}
                value={value.theme_color || '#0048ff'}
                onChange={(event) =>
                  update({ theme_color: event.target.value || '#0048ff' })
                }
              />
            </div>
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>
              Tags (separadas por espaço ou vírgula)
            </span>
            <input
              className={inputClasses}
              value={value.project_tags.join(', ')}
              onChange={(event) =>
                update({ project_tags: splitTokenList(event.target.value) })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>Resumo</span>
            <textarea
              className={`${inputClasses} min-h-24`}
              value={value.project_summary || ''}
              onChange={(event) =>
                update({ project_summary: event.target.value })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>Headline da introdução</span>
            <input
              className={inputClasses}
              value={value.intro_headline || ''}
              onChange={(event) =>
                update({ intro_headline: event.target.value })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>
              Parágrafos da introdução (1 por linha)
            </span>
            <textarea
              className={`${inputClasses} min-h-28`}
              value={(value.intro_body || []).join('\n')}
              onChange={(event) =>
                update({ intro_body: splitLines(event.target.value) })
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Hero e Assets Fixos
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaAssetField
            label="Logo da Hero"
            value={
              value.hero_logo_image || {
                src: '',
                alt: '',
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_logo_image: next })}
            requireAlt
          />

          <MediaAssetField
            label="Capa SEO (opcional, não aparece na hero)"
            value={
              value.hero_cover_image || {
                src: '',
                alt: '',
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_cover_image: next })}
          />
        </div>
      </section>

      <section className="space-y-4 border border-white/10 bg-slate-900/35 p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Navegação e SEO
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className={labelClasses}>Texto do botão voltar</span>
            <input
              className={inputClasses}
              value={value.navigation?.back_label || ''}
              onChange={(event) =>
                update({
                  navigation: {
                    ...value.navigation,
                    back_label: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Texto do próximo projeto</span>
            <input
              className={inputClasses}
              value={value.navigation?.next_label || ''}
              onChange={(event) =>
                update({
                  navigation: {
                    ...value.navigation,
                    next_label: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Slug do próximo projeto</span>
            <input
              className={inputClasses}
              value={value.navigation?.next_project_slug || ''}
              onChange={(event) =>
                update({
                  navigation: {
                    ...value.navigation,
                    next_project_slug: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Texto do CTA final</span>
            <input
              className={inputClasses}
              value={value.cta?.label || ''}
              onChange={(event) =>
                update({
                  cta: {
                    ...value.cta,
                    label: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Link do CTA</span>
            <input
              className={inputClasses}
              value={value.cta?.href || ''}
              onChange={(event) =>
                update({
                  cta: {
                    ...value.cta,
                    href: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>Descrição SEO</span>
            <textarea
              className={`${inputClasses} min-h-24`}
              value={value.seo?.description || ''}
              onChange={(event) =>
                update({
                  seo: {
                    ...value.seo,
                    description: event.target.value,
                  },
                })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>SEO og:image</span>
            <input
              className={inputClasses}
              value={value.seo?.og_image || ''}
              onChange={(event) =>
                update({
                  seo: {
                    ...value.seo,
                    og_image: event.target.value,
                  },
                })
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            Conteúdo Dinâmico (gallery_grid)
          </h3>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 bg-blue-600 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-blue-500"
              >
                <Plus size={14} />
                Adicionar bloco
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 border-white/10 bg-slate-950 text-slate-100"
            >
              <DropdownMenuLabel className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Layouts Básicos
              </DropdownMenuLabel>
              {BASIC_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <DropdownMenuItem
                    key={preset.type}
                    onClick={() => addBlock(preset.type)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {preset.label}
                  </DropdownMenuItem>
                );
              })}

              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuLabel className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Composições
              </DropdownMenuLabel>
              {COMPOSITION_PRESETS.map((preset) => {
                const Icon = preset.icon;
                return (
                  <DropdownMenuItem
                    key={preset.type}
                    onClick={() => addBlock(preset.type)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {preset.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          {value.gallery_grid.length === 0 ? (
            <div className="border border-dashed border-white/15 bg-slate-950/30 px-4 py-12 text-center text-sm text-slate-400">
              Nenhum bloco no gallery_grid. Adicione o primeiro bloco.
            </div>
          ) : null}

          {value.gallery_grid.map((block, index) => {
            const updateCurrentBlock = (next: LandingPageBlock) =>
              updateBlock(block.id, next);

            return (
              <div
                key={block.id}
                className="space-y-4 border border-white/10 bg-slate-900/35 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">
                    Bloco {index + 1} · {blockLabelMap[block.type]}
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'up')}
                      className="border border-white/10 bg-black/40 p-2 text-slate-300 hover:text-white"
                      aria-label="Mover para cima"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'down')}
                      className="border border-white/10 bg-black/40 p-2 text-slate-300 hover:text-white"
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      className="border border-red-400/30 bg-red-500/10 p-2 text-red-300 hover:text-red-200"
                      aria-label="Remover bloco"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {block.type === 'text' ? (
                  <label className="space-y-1">
                    <span className={labelClasses}>Conteúdo de texto</span>
                    <textarea
                      className={`${inputClasses} min-h-28`}
                      value={block.content.text || ''}
                      onChange={(event) =>
                        updateCurrentBlock({
                          ...block,
                          content: {
                            ...block.content,
                            text: event.target.value,
                          },
                        })
                      }
                    />
                  </label>
                ) : null}

                {block.type === 'quote-band' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-1 md:col-span-2">
                      <span className={labelClasses}>Citação</span>
                      <textarea
                        className={`${inputClasses} min-h-20`}
                        value={block.content.text || ''}
                        onChange={(event) =>
                          updateCurrentBlock({
                            ...block,
                            content: {
                              ...block.content,
                              text: event.target.value,
                            },
                          })
                        }
                      />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                      <span className={labelClasses}>
                        Texto de apoio (opcional)
                      </span>
                      <textarea
                        className={`${inputClasses} min-h-20`}
                        value={block.content.text2 || ''}
                        onChange={(event) =>
                          updateCurrentBlock({
                            ...block,
                            content: {
                              ...block.content,
                              text2: event.target.value,
                            },
                          })
                        }
                      />
                    </label>

                    <label className="space-y-1">
                      <span className={labelClasses}>Cor da faixa</span>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          className="h-10 w-12 border border-white/10 bg-transparent"
                          value={block.content.bandColor || '#0048ff'}
                          onChange={(event) =>
                            updateCurrentBlock({
                              ...block,
                              content: {
                                ...block.content,
                                bandColor: event.target.value,
                              },
                            })
                          }
                        />
                        <input
                          className={inputClasses}
                          value={block.content.bandColor || '#0048ff'}
                          onChange={(event) =>
                            updateCurrentBlock({
                              ...block,
                              content: {
                                ...block.content,
                                bandColor: event.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </label>
                  </div>
                ) : null}

                {block.type === 'image' ? (
                  <BlockMediaField
                    block={block}
                    label="Imagem Full"
                    mediaKey="media"
                    altKey="alt"
                    posterKey="poster"
                    fileKey="file"
                    previewKey="previewUrl"
                    kind="image"
                    onChange={updateCurrentBlock}
                  />
                ) : null}

                {block.type === 'video' || block.type === 'video-autoplay' ? (
                  <BlockMediaField
                    block={block}
                    label={
                      block.type === 'video-autoplay'
                        ? 'Vídeo Autoplay (Loop)'
                        : 'Vídeo Full'
                    }
                    mediaKey="media"
                    altKey="alt"
                    posterKey="poster"
                    fileKey="file"
                    previewKey="previewUrl"
                    kind="video"
                    onChange={updateCurrentBlock}
                  />
                ) : null}

                {block.type === 'image-text' ||
                block.type === 'text-image' ||
                block.type === 'video-text' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <BlockMediaField
                      block={block}
                      label={
                        block.type === 'video-text'
                          ? 'Mídia (Vídeo)'
                          : 'Mídia (Imagem)'
                      }
                      mediaKey="media"
                      altKey="alt"
                      posterKey="poster"
                      fileKey="file"
                      previewKey="previewUrl"
                      kind={block.type === 'video-text' ? 'video' : 'image'}
                      onChange={updateCurrentBlock}
                    />

                    <label className="space-y-1">
                      <span className={labelClasses}>Texto</span>
                      <textarea
                        className={`${inputClasses} min-h-40`}
                        value={block.content.text || ''}
                        onChange={(event) =>
                          updateCurrentBlock({
                            ...block,
                            content: {
                              ...block.content,
                              text: event.target.value,
                            },
                          })
                        }
                      />
                    </label>
                  </div>
                ) : null}

                {block.type === 'image-image' ||
                block.type === 'image-video' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <BlockMediaField
                      block={block}
                      label="Mídia 01"
                      mediaKey="media"
                      altKey="alt"
                      posterKey="poster"
                      fileKey="file"
                      previewKey="previewUrl"
                      kind="image"
                      onChange={updateCurrentBlock}
                    />

                    <BlockMediaField
                      block={block}
                      label={
                        block.type === 'image-video'
                          ? 'Mídia 02 (Vídeo)'
                          : 'Mídia 02'
                      }
                      mediaKey="media2"
                      altKey="alt2"
                      posterKey="poster2"
                      fileKey="file2"
                      previewKey="previewUrl2"
                      kind={block.type === 'image-video' ? 'video' : 'image'}
                      onChange={updateCurrentBlock}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
