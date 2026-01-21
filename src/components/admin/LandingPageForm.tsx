'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClientComponentClient } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import {
  Type,
  Image as ImageIcon,
  Video,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layout,
  Save,
  ArrowLeft,
} from 'lucide-react';
import { uploadSiteAsset } from '@/lib/supabase/storage';
import Link from 'next/link';
import Image from 'next/image';

interface Section {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  file?: File | null;
  previewUrl?: string;
}

interface LandingPageFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    cover: string;
    content: any[];
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
  const [sections, setSections] = useState<Section[]>(
    initialData?.content.map((s) => {
      const content =
        s.type !== 'text'
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-assets/${s.content}`
          : s.content;
      return { ...s, id: s.id || uuidv4(), content };
    }) || []
  );
  const [loading, setLoading] = useState(false);

  const handleAddSection = (type: Section['type']) => {
    setSections([...sections, { id: uuidv4(), type, content: '', file: null }]);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
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

  const handleFileUpload = async (file: File, key: string) => {
    const path = await uploadSiteAsset({
      file,
      key,
      page: 'projects',
      subPath: slug,
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

      let coverPath = initialData?.cover || '';
      if (cover) {
        coverPath = await handleFileUpload(cover, 'cover');
      }

      const uploadedSections = await Promise.all(
        sections.map(async (section, idx) => {
          if (section.file) {
            const filePath = await handleFileUpload(
              section.file,
              `section-${idx}`
            );
            return { id: section.id, type: section.type, content: filePath };
          }
          // If it's already a saved content, we need to extract the relative path back
          if (
            section.type !== 'text' &&
            section.content.includes('/site-assets/')
          ) {
            const relative = section.content.split('/site-assets/').pop() || '';
            return { id: section.id, type: section.type, content: relative };
          }
          // Basic return for existing text or already correct paths
          return {
            id: section.id,
            type: section.type,
            content: section.content,
          };
        })
      );

      const payload = {
        title,
        slug,
        cover: coverPath,
        content: uploadedSections,
        updated_at: new Date().toISOString(),
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
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar página.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/landing-pages"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20"
        >
          <Save size={18} />
          {loading ? 'Salvando...' : 'Publicar Página'}
        </button>
      </div>

      <section className="space-y-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 font-bold">
          Informações Básicas
        </h2>
        <div className="grid gap-6 p-8 bg-slate-900/40 border border-white/5 rounded-2xl">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              Título do Projeto
            </label>
            <input
              type="text"
              placeholder="Ex: Mia - Beyond Flying"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xl focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              Slug (URL)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">/projects/</span>
              <input
                type="text"
                placeholder="slug-do-projeto"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value.toLowerCase().replace(/ /g, '-'))
                }
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 font-mono text-sm focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              Capa do Projeto
            </label>
            <div className="relative group">
              {coverPreview ? (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={coverPreview}
                    alt="Capa do projeto"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => {
                        setCover(null);
                        setCoverPreview('');
                      }}
                      className="bg-red-500 p-2 rounded-full"
                      title="Excluir capa"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/5 cursor-pointer transition-all">
                  <ImageIcon className="text-slate-600 mb-2" size={48} />
                  <span className="text-sm text-slate-400">
                    Clique para enviar a capa
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCover(file);
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.3em] text-blue-400 font-bold">
            Estrutura da Página
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleAddSection('text')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <Type size={14} /> Texto
            </button>
            <button
              onClick={() => handleAddSection('image')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <ImageIcon size={14} /> Imagem
            </button>
            <button
              onClick={() => handleAddSection('video')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              <Video size={14} /> Vídeo
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {sections.length === 0 && (
            <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl text-slate-500">
              <Layout className="mx-auto mb-4 opacity-20" size={48} />
              <p>Adicione seções para começar a construir a landing page.</p>
            </div>
          )}

          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-950 px-2 py-0.5 rounded">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    {section.type === 'text'
                      ? 'Bloco de Texto'
                      : section.type === 'image'
                        ? 'Imagem Full'
                        : 'Vídeo Loop'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-slate-500 hover:text-white disabled:opacity-0 transition-all"
                    title="Mover para cima"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1.5 text-slate-500 hover:text-white disabled:opacity-0 transition-all"
                    title="Mover para baixo"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button
                    onClick={() => handleRemoveSection(section.id)}
                    className="p-1.5 text-slate-500 hover:text-red-500 transition-all"
                    title="Remover seção"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {section.type === 'text' && (
                  <textarea
                    placeholder="Conteúdo textual (Markdown suportado)..."
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...sections];
                      newSections[index].content = e.target.value;
                      setSections(newSections);
                    }}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 min-h-[150px] outline-none focus:border-blue-500/50 transition-all resize-y"
                  />
                )}

                {(section.type === 'image' || section.type === 'video') && (
                  <div className="space-y-4">
                    {section.content && !section.file ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group/media">
                        {section.type === 'image' ? (
                          <Image
                            src={section.content}
                            alt={`Seção ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={section.content}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            autoPlay
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                          <label
                            className="bg-blue-600 p-2 rounded-full cursor-pointer"
                            title="Trocar mídia"
                          >
                            <ImageIcon size={20} />
                            <input
                              type="file"
                              className="hidden"
                              title="Trocar mídia"
                              accept={
                                section.type === 'image' ? 'image/*' : 'video/*'
                              }
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const newSections = [...sections];
                                  newSections[index].file = file;
                                  newSections[index].previewUrl =
                                    URL.createObjectURL(file);
                                  setSections(newSections);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : section.previewUrl ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                        {section.type === 'image' ? (
                          <div className="relative aspect-video">
                            <Image
                              src={section.previewUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <video
                            src={section.previewUrl}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            autoPlay
                          />
                        )}
                        <button
                          onClick={() => {
                            const newSections = [...sections];
                            newSections[index].file = null;
                            newSections[index].previewUrl = '';
                            setSections(newSections);
                          }}
                          className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full"
                          title="Limpar seleção"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/5 cursor-pointer transition-all">
                        {section.type === 'image' ? (
                          <ImageIcon
                            className="text-slate-600 mb-2"
                            size={32}
                          />
                        ) : (
                          <Video className="text-slate-600 mb-2" size={32} />
                        )}
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                          Enviar {section.type === 'image' ? 'Imagem' : 'Vídeo'}
                        </span>
                        <input
                          type="file"
                          accept={
                            section.type === 'image' ? 'image/*' : 'video/*'
                          }
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const newSections = [...sections];
                              newSections[index].file = file;
                              newSections[index].previewUrl =
                                URL.createObjectURL(file);
                              setSections(newSections);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <div className="flex gap-4 p-2 bg-slate-900 border border-white/10 rounded-full shadow-2xl">
            <button
              onClick={() => handleAddSection('text')}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all"
              title="Adicionar Texto"
            >
              <Type size={20} />
            </button>
            <button
              onClick={() => handleAddSection('image')}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all"
              title="Adicionar Imagem"
            >
              <ImageIcon size={20} />
            </button>
            <button
              onClick={() => handleAddSection('video')}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 hover:bg-blue-600 text-white transition-all"
              title="Adicionar Vídeo"
            >
              <Video size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
