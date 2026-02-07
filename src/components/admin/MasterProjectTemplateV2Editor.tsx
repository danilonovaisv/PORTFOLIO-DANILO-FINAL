'use client';

import {
  ArrowDown,
  ArrowUp,
  Image as ImageIcon,
  Plus,
  Trash2,
  Video,
} from 'lucide-react';
import type {
  MasterProjectAsset,
  MasterProjectTemplateV2Data,
  MasterProjectV2FeatureItem,
  MasterProjectV2GalleryItem,
} from '@/types/project-template';

export type MasterProjectV2AssetDraft = MasterProjectAsset & {
  file?: File | null;
  previewUrl?: string;
};

export type MasterProjectV2FeatureDraft = MasterProjectV2FeatureItem;

export type MasterProjectV2GalleryDraft = MasterProjectV2GalleryItem & {
  file?: File | null;
  previewUrl?: string;
  features?: MasterProjectV2FeatureDraft[];
};

export type MasterProjectTemplateV2Draft = Omit<
  MasterProjectTemplateV2Data,
  'hero_cover_image' | 'hero_logo_image' | 'gallery_grid'
> & {
  hero_cover_image: MasterProjectV2AssetDraft;
  hero_logo_image?: MasterProjectV2AssetDraft;
  gallery_grid: MasterProjectV2GalleryDraft[];
};

type MasterProjectTemplateV2EditorProps = {
  value: MasterProjectTemplateV2Draft;
  onChange: (_next: MasterProjectTemplateV2Draft) => void;
};

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

const parseFeatures = (value: string): MasterProjectV2FeatureDraft[] =>
  value
    .split('\n')
    .reduce<MasterProjectV2FeatureDraft[]>((acc, line, index) => {
      const [titleRaw, descriptionRaw] = line.split('|');
      const title = titleRaw?.trim();
      if (!title) return acc;

      acc.push({
        id: `feature-${index + 1}`,
        title,
        description: descriptionRaw?.trim() || undefined,
      });
      return acc;
    }, []);

const toFeatureText = (features?: MasterProjectV2FeatureDraft[]) =>
  (features ?? [])
    .map(
      (feature) =>
        `${feature.title}${feature.description ? ` | ${feature.description}` : ''}`
    )
    .join('\n');

const createGalleryDraft = (index: number): MasterProjectV2GalleryDraft => ({
  id: `grid-item-${index + 1}`,
  kind: 'image',
  layout_type: 'grid_2_col',
  media_align: 'left',
  src: '',
  alt: '',
  title: '',
  eyebrow: '',
  description: '',
  quote: '',
  features: [],
});

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-blue-500';

const labelClasses = 'text-[11px] uppercase tracking-[0.15em] text-slate-400';

function MediaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: MasterProjectV2AssetDraft;
  onChange: (_next: MasterProjectV2AssetDraft) => void;
}) {
  const isVideo = value.kind === 'video';
  const preview = value.previewUrl || value.src;
  const missingAlt = !isVideo && !value.alt?.trim();

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
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
            className={`${inputClasses} file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
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
        <span className={labelClasses}>
          Texto alternativo (obrigatório para imagem)
        </span>
        <input
          className={inputClasses}
          value={value.alt || ''}
          onChange={(event) => onChange({ ...value, alt: event.target.value })}
        />
      </label>
      {missingAlt ? (
        <p className="text-xs text-red-300">
          Alt text obrigatório para mídia de imagem.
        </p>
      ) : null}

      {isVideo ? (
        <label className="space-y-1">
          <span className={labelClasses}>Poster (opcional)</span>
          <input
            className={inputClasses}
            placeholder="landing-pages/meu-projeto/poster.webp"
            value={value.poster || ''}
            onChange={(event) =>
              onChange({ ...value, poster: event.target.value })
            }
          />
        </label>
      ) : null}

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
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

export default function MasterProjectTemplateV2Editor({
  value,
  onChange,
}: MasterProjectTemplateV2EditorProps) {
  const update = (updates: Partial<MasterProjectTemplateV2Draft>) => {
    onChange({ ...value, ...updates });
  };

  const updateGalleryItem = (
    id: string,
    updates: Partial<MasterProjectV2GalleryDraft>
  ) => {
    update({
      gallery_grid: value.gallery_grid.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    });
  };

  const removeGalleryItem = (id: string) => {
    update({
      gallery_grid: value.gallery_grid.filter((item) => item.id !== id),
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= value.gallery_grid.length) return;

    const next = [...value.gallery_grid];
    [next[index], next[target]] = [next[target], next[index]];
    update({ gallery_grid: next });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/35 p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Base da Página (V2)
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
            <span className={labelClasses}>Cor de destaque</span>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-12 rounded border border-white/10 bg-transparent"
                value={value.highlight_color || '#0048ff'}
                onChange={(event) =>
                  update({ highlight_color: event.target.value })
                }
                title="Cor de destaque"
              />
              <input
                className={inputClasses}
                value={value.highlight_color || '#0048ff'}
                onChange={(event) =>
                  update({ highlight_color: event.target.value || '#0048ff' })
                }
              />
            </div>
          </label>

          <label className="space-y-1">
            <span className={labelClasses}>Cor do tema (Liquid Ether)</span>
            <div className="flex gap-2">
              <input
                type="color"
                className="h-10 w-12 rounded border border-white/10 bg-transparent"
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
            <span className={labelClasses}>
              Serviços (separados por espaço ou vírgula)
            </span>
            <input
              className={inputClasses}
              value={(value.project_services || []).join(', ')}
              onChange={(event) =>
                update({ project_services: splitTokenList(event.target.value) })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>Resumo</span>
            <textarea
              className={`${inputClasses} min-h-28`}
              value={value.project_summary || ''}
              onChange={(event) =>
                update({ project_summary: event.target.value })
              }
            />
          </label>

          <label className="space-y-1 md:col-span-2">
            <span className={labelClasses}>Headline da intro</span>
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
              className={`${inputClasses} min-h-32`}
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
          Hero
        </h3>
        <div className="grid gap-4 xl:grid-cols-2">
          <MediaField
            label="Capa da Hero"
            value={value.hero_cover_image}
            onChange={(next) => update({ hero_cover_image: next })}
          />
          <MediaField
            label="Logo Hero (opcional)"
            value={
              value.hero_logo_image || {
                src: '',
                alt: '',
                kind: 'image',
                poster: '',
              }
            }
            onChange={(next) => update({ hero_logo_image: next })}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/35 p-5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
          Navegação e SEO
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className={labelClasses}>Texto botão voltar</span>
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
            <span className={labelClasses}>Texto próximo projeto</span>
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
            <span className={labelClasses}>Slug próximo projeto</span>
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
            <span className={labelClasses}>CTA</span>
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
            <span className={labelClasses}>Link CTA</span>
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
            <span className={labelClasses}>SEO descrição</span>
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
          <button
            type="button"
            onClick={() =>
              update({
                gallery_grid: [
                  ...value.gallery_grid,
                  createGalleryDraft(value.gallery_grid.length),
                ],
              })
            }
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-600 px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:bg-blue-500"
          >
            <Plus size={14} />
            Adicionar bloco
          </button>
        </div>

        <div className="space-y-4">
          {value.gallery_grid.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/30 px-4 py-12 text-center text-sm text-slate-400">
              Nenhum bloco no gallery_grid. Adicione o primeiro bloco.
            </div>
          ) : null}

          {value.gallery_grid.map((item, index) => {
            const preview = item.previewUrl || item.src;
            const missingAlt = item.kind !== 'video' && !item.alt?.trim();
            const isQuote = item.layout_type === 'grid_quote';
            const isSplit = item.layout_type === 'grid_split';
            const isFeatures = item.layout_type === 'grid_features_3';

            return (
              <div
                key={item.id}
                className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/35 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">
                    Bloco {index + 1}
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveItem(index, 'up')}
                      className="rounded-md border border-white/10 bg-black/40 p-2 text-slate-300 hover:text-white"
                      aria-label="Mover para cima"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveItem(index, 'down')}
                      className="rounded-md border border-white/10 bg-black/40 p-2 text-slate-300 hover:text-white"
                      aria-label="Mover para baixo"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(item.id)}
                      className="rounded-md border border-red-400/30 bg-red-500/10 p-2 text-red-300 hover:text-red-200"
                      aria-label="Remover bloco"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-1">
                    <span className={labelClasses}>Tipo de layout</span>
                    <select
                      className={inputClasses}
                      value={item.layout_type}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          layout_type: event.target
                            .value as MasterProjectV2GalleryItem['layout_type'],
                        })
                      }
                    >
                      <option value="grid_2_col">Grid 2 colunas</option>
                      <option value="grid_1_col">Grid 1 coluna</option>
                      <option value="grid_feat">Full Highlight</option>
                      <option value="grid_features_3">Destaques 3</option>
                      <option value="grid_quote">Citação</option>
                      <option value="grid_split">Split</option>
                    </select>
                  </label>

                  <label className="space-y-1">
                    <span className={labelClasses}>Tipo de mídia</span>
                    <select
                      className={inputClasses}
                      value={item.kind}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          kind:
                            event.target.value === 'video' ? 'video' : 'image',
                        })
                      }
                    >
                      <option value="image">Imagem</option>
                      <option value="video">Vídeo</option>
                    </select>
                  </label>

                  {isSplit ? (
                    <label className="space-y-1">
                      <span className={labelClasses}>Posição da mídia</span>
                      <select
                        className={inputClasses}
                        value={item.media_align || 'left'}
                        onChange={(event) =>
                          updateGalleryItem(item.id, {
                            media_align:
                              event.target.value === 'right' ? 'right' : 'left',
                          })
                        }
                      >
                        <option value="left">Esquerda</option>
                        <option value="right">Direita</option>
                      </select>
                    </label>
                  ) : null}

                  {!isQuote ? (
                    <>
                      <label className="space-y-1 md:col-span-2">
                        <span className={labelClasses}>URL / Caminho</span>
                        <input
                          className={inputClasses}
                          value={item.src}
                          onChange={(event) =>
                            updateGalleryItem(item.id, {
                              src: event.target.value,
                              file: null,
                              previewUrl: '',
                            })
                          }
                        />
                      </label>

                      <label className="space-y-1">
                        <span className={labelClasses}>Upload</span>
                        <input
                          type="file"
                          className={`${inputClasses} file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white`}
                          accept={item.kind === 'video' ? 'video/*' : 'image/*'}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            updateGalleryItem(item.id, {
                              file,
                              previewUrl: URL.createObjectURL(file),
                            });
                          }}
                        />
                      </label>

                      <label className="space-y-1">
                        <span className={labelClasses}>Poster (vídeo)</span>
                        <input
                          className={inputClasses}
                          value={item.poster || ''}
                          onChange={(event) =>
                            updateGalleryItem(item.id, {
                              poster: event.target.value,
                            })
                          }
                        />
                      </label>
                    </>
                  ) : null}

                  {item.kind !== 'video' ? (
                    <label className="space-y-1 md:col-span-2">
                      <span className={labelClasses}>Alt (obrigatório)</span>
                      <input
                        className={inputClasses}
                        value={item.alt}
                        onChange={(event) =>
                          updateGalleryItem(item.id, {
                            alt: event.target.value,
                          })
                        }
                      />
                    </label>
                  ) : null}
                  {missingAlt ? (
                    <p className="md:col-span-2 text-xs text-red-300">
                      Alt text obrigatório para blocos de imagem.
                    </p>
                  ) : null}

                  <label className="space-y-1">
                    <span className={labelClasses}>Sobretítulo</span>
                    <input
                      className={inputClasses}
                      value={item.eyebrow || ''}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          eyebrow: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="space-y-1">
                    <span className={labelClasses}>Título</span>
                    <input
                      className={inputClasses}
                      value={item.title || ''}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          title: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="space-y-1 md:col-span-2">
                    <span className={labelClasses}>Descrição</span>
                    <textarea
                      className={`${inputClasses} min-h-24`}
                      value={item.description || ''}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          description: event.target.value,
                        })
                      }
                    />
                  </label>

                  <label className="space-y-1 md:col-span-2">
                    <span className={labelClasses}>Citação</span>
                    <input
                      className={inputClasses}
                      value={item.quote || ''}
                      onChange={(event) =>
                        updateGalleryItem(item.id, {
                          quote: event.target.value,
                        })
                      }
                    />
                  </label>

                  {isFeatures ? (
                    <label className="space-y-1 md:col-span-2">
                      <span className={labelClasses}>
                        Destaques (1 por linha: título | descrição)
                      </span>
                      <textarea
                        className={`${inputClasses} min-h-24`}
                        value={toFeatureText(item.features)}
                        onChange={(event) =>
                          updateGalleryItem(item.id, {
                            features: parseFeatures(event.target.value),
                          })
                        }
                      />
                    </label>
                  ) : null}
                </div>

                {preview ? (
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50">
                    {item.kind === 'video' ? (
                      <video
                        src={preview}
                        className="h-48 w-full object-cover"
                        controls
                        muted
                        playsInline
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt={item.alt || 'Pré-visualização'}
                        className="h-48 w-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-slate-500">
                    {item.kind === 'video' ? (
                      <Video className="mr-2 h-4 w-4" />
                    ) : (
                      <ImageIcon className="mr-2 h-4 w-4" />
                    )}
                    Sem pré-visualização
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
