'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { LandingPageBlock, BlockType } from '@/types/landing-page';
import {
  LEGACY_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
  type ProjectTemplateId,
} from '@/types/project-template';
import {
  createDefaultMasterProjectTemplate,
  createDefaultMasterProjectTemplateV2,
  createDefaultMasterProjectTemplateV3,
  parseLandingPageContent,
} from '@/lib/projects/template-schema';
import { type MasterProjectTemplateDraft } from '@/components/admin/MasterProjectTemplateEditor';
import { type MasterProjectTemplateV2Draft } from '@/components/admin/MasterProjectTemplateV2Editor';
import { type MasterProjectTemplateV3Draft } from '@/components/admin/MasterProjectTemplateV3Editor';
import { saveLandingPageAction } from '@/app/admin/(protected)/landing-pages/actions';
import { prepareLandingPageData } from '@/lib/admin/services/landing-page-save';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  toMasterDraft,
  toMasterV2Draft,
  toMasterV3Draft,
} from '@/lib/admin/transformers/landing-page';

// Sub-components
import { LandingPageHeader } from './landing-pages/LandingPageHeader';
import { LandingPageSettings } from './landing-pages/LandingPageSettings';
import { LandingPageEditorSwitch } from './landing-pages/LandingPageEditorSwitch';

interface LandingPageFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    cover: string | null;
    content: unknown;
  };
}

export default function LandingPageForm({ initialData }: LandingPageFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const initialParsed = useMemo(
    () =>
      parseLandingPageContent(initialData?.content, {
        slug: initialData?.slug,
        title: initialData?.title,
        cover: initialData?.cover,
      }),
    [initialData]
  );

  // --- State ---
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [template, setTemplate] = useState<ProjectTemplateId>(
    initialData ? initialParsed.template : MASTER_PROJECT_TEMPLATE_V3
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

  const [masterTemplateV2, setMasterTemplateV2] =
    useState<MasterProjectTemplateV2Draft>(
      toMasterV2Draft(
        initialParsed.template === MASTER_PROJECT_TEMPLATE_V2
          ? initialParsed.data
          : createDefaultMasterProjectTemplateV2({
              slug: initialData?.slug,
              title: initialData?.title,
              cover: initialData?.cover,
            })
      )
    );

  const [masterTemplateV3, setMasterTemplateV3] =
    useState<MasterProjectTemplateV3Draft>(
      toMasterV3Draft(
        initialParsed.template === MASTER_PROJECT_TEMPLATE_V3
          ? initialParsed.data
          : createDefaultMasterProjectTemplateV3({
              slug: initialData?.slug,
              title: initialData?.title,
              cover: initialData?.cover,
            })
      )
    );

  const [loading, setLoading] = useState(false);
  const [sectionToRemove, setSectionToRemove] = useState<string | null>(null);

  // --- Handlers ---
  const handleAddBlock = (type: BlockType) => {
    setSections((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type,
        content: {},
        file: null,
        file2: null,
      },
    ]);
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
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const handleRemoveSection = (id: string) => {
    setSectionToRemove(id);
  };

  const confirmRemoveSection = () => {
    if (sectionToRemove) {
      setSections((prev) => prev.filter((s) => s.id !== sectionToRemove));
      setSectionToRemove(null);
    }
  };

  const handleSyncWithTemplates = (nextTitle: string) => {
    if (template === MASTER_PROJECT_TEMPLATE) {
      setMasterTemplate((prev) => ({ ...prev, project_title: nextTitle }));
    } else if (template === MASTER_PROJECT_TEMPLATE_V2) {
      setMasterTemplateV2((prev) => ({ ...prev, project_title: nextTitle }));
    } else if (template === MASTER_PROJECT_TEMPLATE_V3) {
      setMasterTemplateV3((prev) => ({ ...prev, project_title: nextTitle }));
    }
  };

  const handleSyncSlugWithTemplates = (nextSlug: string) => {
    if (template === MASTER_PROJECT_TEMPLATE) {
      setMasterTemplate((prev) => ({ ...prev, project_slug: nextSlug }));
    } else if (template === MASTER_PROJECT_TEMPLATE_V2) {
      setMasterTemplateV2((prev) => ({ ...prev, project_slug: nextSlug }));
    } else if (template === MASTER_PROJECT_TEMPLATE_V3) {
      setMasterTemplateV3((prev) => ({ ...prev, project_slug: nextSlug }));
    }
  };

  const normalizeTemplateV3IntroBody = (
    introBody: MasterProjectTemplateV3Draft['intro_body']
  ) => {
    if (!Array.isArray(introBody)) return [];

    return introBody
      .map((item) => {
        if (typeof item === 'string') {
          if (!item.trim()) return null;
          return {
            type: 'text' as const,
            value: item,
            settings: { autoplay: false },
          };
        }

        if (!item || typeof item !== 'object') return null;

        const type = item.type === 'video_youtube' ? 'video_youtube' : 'text';
        const value = typeof item.value === 'string' ? item.value : '';
        if (!value.trim()) return null;

        return {
          type,
          value,
          settings: {
            autoplay:
              typeof item.settings?.autoplay === 'boolean'
                ? item.settings.autoplay
                : type === 'video_youtube',
          },
        };
      })
      .filter(
        (
          item
        ): item is {
          type: 'text' | 'video_youtube';
          value: string;
          settings: { autoplay: boolean };
        } => Boolean(item)
      );
  };

  const handleSave = async () => {
    if (!title || !slug) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Slug e Título são necessários.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { finalContent, finalCover } = await prepareLandingPageData({
        id: initialData?.id,
        title,
        slug,
        cover,
        initialCover: initialData?.cover || null,
        template,
        sections,
        masterTemplate,
        masterTemplateV2,
        masterTemplateV3: {
          ...masterTemplateV3,
          intro_body: normalizeTemplateV3IntroBody(masterTemplateV3.intro_body),
        },
      });

      const result = await saveLandingPageAction({
        id: initialData?.id,
        title,
        slug,
        cover: finalCover ?? undefined,
        content: finalContent as any,
      });

      if (result.ok) {
        toast({ title: 'Sucesso', description: 'Landing Page salva!' });
        router.push('/admin/landing-pages');
        router.refresh();
      } else {
        throw new Error('Erro desconhecido ao salvar');
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-12 pb-24">
      <LandingPageHeader
        slug={slug}
        loading={loading}
        onSave={handleSave}
        template={template}
        masterTemplateItemCount={masterTemplate.gallery_grid.length}
        masterTemplateV2ItemCount={masterTemplateV2.gallery_grid.length}
        masterTemplateV3ItemCount={masterTemplateV3.gallery_grid.length}
        sectionsCount={sections.length}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <aside className="lg:col-span-1">
          <LandingPageSettings
            title={title}
            setTitle={setTitle}
            slug={slug}
            setSlug={setSlug}
            template={template}
            setTemplate={setTemplate}
            coverPreview={coverPreview}
            setCover={setCover}
            setCoverPreview={setCoverPreview}
            onSyncWithTemplates={handleSyncWithTemplates}
            onSyncSlugWithTemplates={handleSyncSlugWithTemplates}
          />
        </aside>

        <main className="space-y-8 lg:col-span-2">
          <LandingPageEditorSwitch
            template={template}
            masterTemplate={masterTemplate}
            setMasterTemplate={setMasterTemplate}
            masterTemplateV2={masterTemplateV2}
            setMasterTemplateV2={setMasterTemplateV2}
            masterTemplateV3={masterTemplateV3}
            setMasterTemplateV3={setMasterTemplateV3}
            sections={sections}
            onAddBlock={handleAddBlock}
            onRemoveSection={handleRemoveSection}
            onMoveSection={moveSection}
            onUpdateBlock={updateBlock}
          />
        </main>
      </div>

      <AlertDialog
        open={!!sectionToRemove}
        onOpenChange={(open) => !open && setSectionToRemove(null)}
      >
        <AlertDialogContent className="border-white/10 bg-slate-950 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Remover bloco?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Tem certeza que deseja remover este bloco? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-transparent text-white hover:bg-white/5">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveSection}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
