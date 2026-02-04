'use client';

import { useState } from 'react';
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

interface LandingPageFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    cover: string;
    content: LandingPageBlock[];
  };
}

export default function LandingPageForm({ initialData }: LandingPageFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(
    initialData?.cover
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${initialData.cover}`
      : ''
  );

  // Map initial content to our strictly typed blocks
  const [sections, setSections] = useState<LandingPageBlock[]>(
    (initialData?.content as LandingPageBlock[])?.map((s) => ({
      ...s,
      id: s.id || uuidv4(),
      // Ensure content object structure
      content: {
        ...s.content,
        // Hydrate full URLs for simple single-media existing blocks if needed
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
    })) || []
  );

  const [loading, setLoading] = useState(false);

  const handleAddBlock = (type: BlockType) => {
    setSections([
      ...sections,
      {
        id: uuidv4(),
        type,
        content: {}, // Empty content init
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
      page: 'landing-pages', // Shared bucket folder
      subPath: slug || 'general',
      bucket: 'site-assets',
    });
    return path;
  };

  const handleSave = async () => {
    if (!title || !slug) {
      alert('Título e Slug são obrigatórios.');
      return;
    }

    try {
      setLoading(true);

      // Upload Cover
      let coverPath = initialData?.cover || '';
      if (cover) {
        const path = await handleFileUpload(cover, `cover-${uuidv4()}`);
        if (path) coverPath = path;
      }

      // Upload Block Assets
      const uploadedSections = await Promise.all(
        sections.map(async (section) => {
          let mediaPath = section.content.media;
          let media2Path = section.content.media2;

          // Process File 1
          if (section.file) {
            const path = await handleFileUpload(
              section.file,
              `block-${section.id}-media1`
            );
            if (path) mediaPath = path;
          } else if (mediaPath && mediaPath.includes('/site-assets/')) {
            // Strip full URL to save relative path
            mediaPath = mediaPath.split('/site-assets/').pop() || '';
          }

          // Process File 2
          if (section.file2) {
            const path = await handleFileUpload(
              section.file2,
              `block-${section.id}-media2`
            );
            if (path) media2Path = path;
          } else if (media2Path && media2Path.includes('/site-assets/')) {
            media2Path = media2Path.split('/site-assets/').pop() || '';
          }

          // Return clean object for DB
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

      const payload = {
        title,
        slug,
        cover: coverPath,
        content: uploadedSections,
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
    <div className="max-w-5xl mx-auto space-y-12 pb-48">
      {/* Header Actions */}
      <div className="sticky top-4 z-50 bg-black/50 backdrop-blur-md p-4 rounded-full border border-white/10 flex items-center justify-between shadow-2xl">
        <Link
          href="/admin/landing-pages"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Voltar</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-500 text-sm hidden lg:inline">
            {sections.length} blocos adicionados
          </span>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 text-sm tracking-wide"
          >
            <Save size={18} />
            {loading ? 'PUBLICANDO...' : 'SALVAR PÁGINA'}
          </button>
        </div>
      </div>

      {/* Main Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata & Global Settings */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 space-y-6 sticky top-28">
            <h2 className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold mb-4">
              Configurações
            </h2>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium focus:border-blue-500 outline-none"
                placeholder="Nome do Projeto"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Slug URL
              </label>
              <div className="flex items-center gap-1 text-slate-500 bg-slate-950 border border-white/10 rounded-xl px-3 py-2">
                <span className="text-xs">/projects/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) =>
                    setSlug(
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                    )
                  }
                  className="bg-transparent border-none outline-none text-white text-sm w-full font-mono"
                  placeholder="my-project"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
                Header Hero Image{' '}
                <span className="text-blue-500 text-[10px]">(Cover)</span>
              </label>
              <div className="relative group aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-white/10">
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
                      className="absolute top-2 right-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remover Capa"
                      aria-label="Remover Capa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
                    <ImageIcon className="text-slate-600 mb-2" />
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
          </div>
        </div>

        {/* Right Column: Page Builder */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.2em] text-white font-bold">
              Builder
            </h2>

            {/* Add Block Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all shadow-lg hover:shadow-blue-500/25">
                  <Plus size={16} /> Adicionar Bloco
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-slate-900 border-slate-800 text-slate-200"
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

                <DropdownMenuItem onClick={() => handleAddBlock('image-text')}>
                  <div className="flex mr-2 items-center">
                    <ImageIcon className="h-3 w-3" />
                    <Type className="h-3 w-3" />
                  </div>{' '}
                  Imagem + Texto
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddBlock('text-image')}>
                  <div className="flex mr-2 items-center">
                    <Type className="h-3 w-3" />
                    <ImageIcon className="h-3 w-3" />
                  </div>{' '}
                  Texto + Imagem
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddBlock('image-image')}>
                  <ColumnsIcon className="mr-2 h-4 w-4" /> Imagem Dupla (Grid)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddBlock('image-video')}>
                  <div className="flex mr-2 items-center">
                    <ImageIcon className="h-3 w-3" />
                    <Video className="h-3 w-3" />
                  </div>{' '}
                  Imagem + Vídeo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddBlock('video-text')}>
                  <div className="flex mr-2 items-center">
                    <Video className="h-3 w-3" />
                    <Type className="h-3 w-3" />
                  </div>{' '}
                  Vídeo + Texto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Blocks List */}
          <div className="space-y-8 min-h-[500px]">
            {sections.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl bg-slate-900/20 text-slate-500">
                <Layout className="mb-4 opacity-20" size={64} />
                <p className="text-sm">
                  Comece adicionando um bloco via menu acima.
                </p>
              </div>
            )}

            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all shadow-xl"
              >
                {/* Block Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      {section.type.replace('-', ' & ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-20"
                      title="Mover para cima"
                      aria-label="Mover para cima"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-20"
                      title="Mover para baixo"
                      aria-label="Mover para baixo"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <button
                      onClick={() => handleRemoveSection(section.id)}
                      className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-slate-500"
                      title="Remover bloco"
                      aria-label="Remover bloco"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Editor Canvas */}
                <BlockEditor
                  block={section}
                  onChange={(updates) => updateBlock(section.id, updates)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
