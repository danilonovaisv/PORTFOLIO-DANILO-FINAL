'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClientComponentClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  ArrowLeft,
  Plus,
  Layout,
  ImageIcon,
  Type,
  Video,
  Columns as ColumnsIcon,
} from 'lucide-react';
import { uploadSiteAsset } from '@/lib/supabase/storage';
import Link from 'next/link';
import Image from 'next/image';
import { LandingPageBlock, BlockType } from '@/types/landing-page';
import { BlockEditor } from './blocks/BlockEditor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  type MasterProjectTemplateData,
  type ProjectTemplateId,
} from '@/types/project-template';
import {
  createDefaultMasterProjectTemplate,
  parseLandingPageContent,
} from '@/lib/projects/template-schema';
import MasterProjectTemplateEditor, {
  type MasterProjectTemplateDraft,
} from './MasterProjectTemplateEditor';

interface LandingPageFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    cover: string;
    content: unknown;
  };
}

const storageMarker = '/site-assets/';

const toStoragePath = (value?: string): string => {
  if (!value) return '';

  if (value.includes(storageMarker)) {
    return value.split(storageMarker).pop() || '';
  }

  return value
    .replace(/^\/?storage\/v1\/object\/public\/site-assets\//, '')
    .replace(/^\/?site-assets\//, '')
    .replace(/^\//, '');
};

const toMasterDraft = (
  value: MasterProjectTemplateData
): MasterProjectTemplateDraft => ({
  ...value,
  hero_cover_image: {
    ...value.hero_cover_image,
    file: null,
    previewUrl: '',
  },
  hero_logo_image: value.hero_logo_image
    ? {
        ...value.hero_logo_image,
        file: null,
        previewUrl: '',
      }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    ...item,
    file: null,
    previewUrl: '',
  })),
});

const stripMasterDraft = (
  value: MasterProjectTemplateDraft
): MasterProjectTemplateData => ({
  ...value,
  hero_cover_image: {
    src: value.hero_cover_image.src,
    alt: value.hero_cover_image.alt,
    kind: value.hero_cover_image.kind,
    poster: value.hero_cover_image.poster,
  },
  hero_logo_image: value.hero_logo_image
    ? {
        src: value.hero_logo_image.src,
        alt: value.hero_logo_image.alt,
        kind: value.hero_logo_image.kind,
        poster: value.hero_logo_image.poster,
      }
    : undefined,
  gallery_grid: value.gallery_grid.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    kind: item.kind,
    layout: item.layout,
    poster: item.poster,
    title: item.title,
    eyebrow: item.eyebrow,
    description: item.description,
    quote: item.quote,
  })),
});

export default function LandingPageForm({ initialData }: LandingPageFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const initialParsed = useMemo(
    () =>
      parseLandingPageContent(initialData?.content, {
        slug: initialData?.slug,
        title: initialData?.title,
        cover: initialData?.cover,
      }),
    [initialData]
  );

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [template, setTemplate] = useState<ProjectTemplateId>(
    initialParsed.template
  );

  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(
    initialData?.cover
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${initialData.cover}`
      : ''
  );

  const [sections, setSections] = useState<LandingPageBlock[]>(
    initialParsed.template === LEGACY_PROJECT_TEMPLATE
      ? initialParsed.blocks.map((s) => ({
          ...s,
          id: s.id || uuidv4(),
          content: {
            ...s.content,
            media: s.content.media?.startsWith('http')
              ? s.content.media
              : s.content.media
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${s.content.media}`
                : undefined,
            media2: s.content.media2?.startsWith('http')
              ? s.content.media2
              : s.content.media2
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${s.content.media2}`
                : undefined,
          },
        }))
      : []
  );

  const [masterTemplate, setMasterTemplate] =
    useState<MasterProjectTemplateDraft>(
      toMasterDraft(
        initialParsed.template === MASTER_PROJECT_TEMPLATE
          ? initialParsed.data
          : createDefaultMasterProjectTemplate({
              slug: initialData?.slug,
              title: initialData?.title,
              cover: initialData?.cover,
            })
      )
    );

  const [loading, setLoading] = useState(false);

  const handleAddBlock = (type: BlockType) => {
    setSections([
      ...sections,
      {
        id: uuidv4(),
        type,
        content: {},
        file: null,
        file2: null,
      },
    ]);
  };

  const handleRemoveSection = (id: string) => {
    if (confirm('Tem certeza que deseja remover este bloco?')) {
      setSections(sections.filter((s) => s.id !== id));
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    [newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ];
    setSections(newSections);
  };

  const updateBlock = (id: string, updates: Partial<LandingPageBlock>) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleFileUpload = async (file: File, key: string) => {
    const path = await uploadSiteAsset({
      file,
      key,
      page: 'landing-pages',
      subPath: slug || 'general',
      bucket: 'site-assets',
    });
    return path;
  };

  const saveLegacyContent = async () => {
    let coverPath = initialData?.cover || '';

    if (cover) {
      const path = await handleFileUpload(cover, `cover-${uuidv4()}`);
      if (path) coverPath = path;
    }

    const uploadedSections = await Promise.all(
      sections.map(async (section) => {
        let mediaPath = section.content.media;
        let media2Path = section.content.media2;

        if (section.file) {
          const path = await handleFileUpload(
            section.file,
            `block-${section.id}-media1`
          );
          if (path) mediaPath = path;
        } else if (mediaPath) {
          mediaPath = toStoragePath(mediaPath);
        }

        if (section.file2) {
          const path = await handleFileUpload(
            section.file2,
            `block-${section.id}-media2`
          );
          if (path) media2Path = path;
        } else if (media2Path) {
          media2Path = toStoragePath(media2Path);
        }

        return {
          id: section.id,
          type: section.type,
          content: {
            ...section.content,
            media: mediaPath,
            media2: media2Path,
          },
        };
      })
    );

    return {
      coverPath,
      content: uploadedSections,
    };
  };

  const saveMasterTemplate = async () => {
    const nextTemplate = {
      ...masterTemplate,
      project_slug: slug,
      project_title: masterTemplate.project_title || title,
    };

    let heroCoverSrc = nextTemplate.hero_cover_image.src;
    if (nextTemplate.hero_cover_image.file) {
      const path = await handleFileUpload(
        nextTemplate.hero_cover_image.file,
        `master-hero-${uuidv4()}`
      );
      if (path) heroCoverSrc = path;
    } else {
      heroCoverSrc = toStoragePath(heroCoverSrc);
    }

    let heroLogo = nextTemplate.hero_logo_image;
    if (heroLogo?.file) {
      const path = await handleFileUpload(
        heroLogo.file,
        `master-logo-${uuidv4()}`
      );
      if (path) {
        heroLogo = {
          ...heroLogo,
          src: path,
          file: null,
          previewUrl: '',
        };
      }
    } else if (heroLogo?.src) {
      heroLogo = {
        ...heroLogo,
        src: toStoragePath(heroLogo.src),
      };
    }

    const galleryGrid = await Promise.all(
      nextTemplate.gallery_grid.map(async (item) => {
        let src = item.src;
        if (item.file) {
          const path = await handleFileUpload(
            item.file,
            `master-grid-${item.id}`
          );
          if (path) src = path;
        } else {
          src = toStoragePath(src);
        }

        return {
          ...item,
          src,
          poster: item.poster ? toStoragePath(item.poster) : item.poster,
          file: null,
          previewUrl: '',
        };
      })
    );

    const cleanTemplate = stripMasterDraft({
      ...nextTemplate,
      hero_cover_image: {
        ...nextTemplate.hero_cover_image,
        src: heroCoverSrc,
        file: null,
        previewUrl: '',
      },
      hero_logo_image: heroLogo,
      gallery_grid: galleryGrid,
      seo: {
        ...nextTemplate.seo,
        og_image: nextTemplate.seo?.og_image
          ? toStoragePath(nextTemplate.seo.og_image)
          : heroCoverSrc,
      },
    });

    return {
      coverPath: heroCoverSrc,
      content: cleanTemplate,
    };
  };

  const handleSave = async () => {
    if (!title || !slug) {
      alert('Título e Slug são obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      const persisted =
        template === MASTER_PROJECT_TEMPLATE
          ? await saveMasterTemplate()
          : await saveLegacyContent();

      const payload = {
        title,
        slug,
        cover: persisted.coverPath,
        content: persisted.content,
      };

      if (initialData?.id) {
        const { error } = await supabase
          .from('landing_pages')
          .update(payload)
          .eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('landing_pages')
          .insert({ ...payload, created_at: new Date().toISOString() });
        if (error) throw error;
      }

      router.push('/admin/landing-pages');
      router.refresh();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      console.error(err);
      alert(`Erro ao salvar página: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-48">
      <div className="sticky top-4 z-50 flex items-center justify-between rounded-full border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-md">
        <Link
          href="/admin/landing-pages"
          className="flex items-center gap-2 px-4 text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <div className="flex items-center gap-4">
          {slug ? (
            <Link
              href={`/projects/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-200 transition-colors hover:border-blue-400 hover:text-white md:inline-flex"
            >
              Preview
            </Link>
          ) : null}
          <span className="hidden text-sm text-slate-500 lg:inline">
            {template === MASTER_PROJECT_TEMPLATE
              ? `${masterTemplate.gallery_grid.length} itens no gallery_grid`
              : `${sections.length} blocos adicionados`}
          </span>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'PUBLICANDO...' : 'SALVAR PÁGINA'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="sticky top-28 space-y-6 rounded-3xl border border-white/5 bg-slate-900/40 p-6">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              Configurações
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Tipo de Template
              </label>
              <select
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
                value={template}
                onChange={(event) =>
                  setTemplate(event.target.value as ProjectTemplateId)
                }
              >
                <option value={MASTER_PROJECT_TEMPLATE}>
                  Template Mestre Novo
                </option>
                <option value={LEGACY_PROJECT_TEMPLATE}>Legacy Blocks</option>
              </select>
              <p className="text-[11px] leading-relaxed text-slate-500">
                O template novo usa schema estruturado para páginas editoriais
                em `/projects/:slug`. O modo legacy mantém o builder por blocos.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setTitle(nextTitle);
                  if (
                    template === MASTER_PROJECT_TEMPLATE &&
                    !masterTemplate.project_title
                  ) {
                    setMasterTemplate((prev) => ({
                      ...prev,
                      project_title: nextTitle,
                    }));
                  }
                }}
                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-lg font-medium outline-none focus:border-blue-500"
                placeholder="Nome do Projeto"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Slug URL
              </label>
              <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-slate-500">
                <span className="text-xs">/projects/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    const nextSlug = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, '-');
                    setSlug(nextSlug);
                    if (template === MASTER_PROJECT_TEMPLATE) {
                      setMasterTemplate((prev) => ({
                        ...prev,
                        project_slug: nextSlug,
                      }));
                    }
                  }}
                  className="w-full bg-transparent text-sm font-mono text-white outline-none"
                  placeholder="my-project"
                />
              </div>
            </div>

            {template === LEGACY_PROJECT_TEMPLATE ? (
              <div className="space-y-3 border-t border-white/5 pt-4">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Header Hero Image{' '}
                  <span className="text-[10px] text-blue-500">(Cover)</span>
                </label>
                <div className="group relative aspect-4/3 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                  {coverPreview ? (
                    <>
                      <Image
                        src={coverPreview}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => {
                          setCover(null);
                          setCoverPreview('');
                        }}
                        className="absolute top-2 right-2 rounded-full bg-red-600 p-2 opacity-0 transition-opacity group-hover:opacity-100"
                        title="Remover Capa"
                        aria-label="Remover Capa"
                        type="button"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center transition-colors hover:bg-white/5">
                      <ImageIcon className="mb-2 text-slate-600" />
                      <span className="text-[10px] text-slate-500">
                        Upload Capa
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            setCover(f);
                            setCoverPreview(URL.createObjectURL(f));
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-8 lg:col-span-2">
          {template === MASTER_PROJECT_TEMPLATE ? (
            <MasterProjectTemplateEditor
              value={masterTemplate}
              onChange={setMasterTemplate}
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                  Builder
                </h2>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-blue-500 hover:shadow-blue-500/25">
                      <Plus size={16} /> Adicionar Bloco
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 border-slate-800 bg-slate-900 text-slate-200"
                  >
                    <DropdownMenuLabel className="text-xs uppercase tracking-widest text-slate-500">
                      Layouts Básicos
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleAddBlock('text')}>
                      <Type className="mr-2 h-4 w-4" /> Texto Puro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAddBlock('image')}>
                      <ImageIcon className="mr-2 h-4 w-4" /> Imagem Full
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAddBlock('video')}>
                      <Video className="mr-2 h-4 w-4" /> Vídeo Full
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAddBlock('video-autoplay')}
                    >
                      <Video className="mr-2 h-4 w-4 text-blue-400" /> Vídeo
                      Autoplay (Loop)
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuLabel className="text-xs uppercase tracking-widest text-slate-500">
                      Composições
                    </DropdownMenuLabel>

                    <DropdownMenuItem
                      onClick={() => handleAddBlock('image-text')}
                    >
                      <div className="mr-2 flex items-center">
                        <ImageIcon className="h-3 w-3" />
                        <Type className="h-3 w-3" />
                      </div>{' '}
                      Imagem + Texto
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAddBlock('text-image')}
                    >
                      <div className="mr-2 flex items-center">
                        <Type className="h-3 w-3" />
                        <ImageIcon className="h-3 w-3" />
                      </div>{' '}
                      Texto + Imagem
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAddBlock('image-image')}
                    >
                      <ColumnsIcon className="mr-2 h-4 w-4" /> Imagem Dupla
                      (Grid)
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAddBlock('image-video')}
                    >
                      <div className="mr-2 flex items-center">
                        <ImageIcon className="h-3 w-3" />
                        <Video className="h-3 w-3" />
                      </div>{' '}
                      Imagem + Vídeo
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleAddBlock('video-text')}
                    >
                      <div className="mr-2 flex items-center">
                        <Video className="h-3 w-3" />
                        <Type className="h-3 w-3" />
                      </div>{' '}
                      Vídeo + Texto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="min-h-[500px] space-y-8">
                {sections.length === 0 && (
                  <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 bg-slate-900/20 text-slate-500">
                    <Layout className="mb-4 opacity-20" size={64} />
                    <p className="text-sm">
                      Comece adicionando um bloco via menu acima.
                    </p>
                  </div>
                )}

                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-xl transition-all hover:border-blue-500/30"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-bold text-blue-400">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          {section.type.replace('-', ' & ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 opacity-50 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-20"
                          title="Mover para cima"
                          aria-label="Mover para cima"
                          type="button"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === sections.length - 1}
                          className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-20"
                          title="Mover para baixo"
                          aria-label="Mover para baixo"
                          type="button"
                        >
                          <ChevronDown size={14} />
                        </button>
                        <div className="mx-2 h-4 w-px bg-white/10" />
                        <button
                          onClick={() => handleRemoveSection(section.id)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-500/20 hover:text-red-400"
                          title="Remover bloco"
                          aria-label="Remover bloco"
                          type="button"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <BlockEditor
                      block={section}
                      onChange={(updates) => updateBlock(section.id, updates)}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
