'use client';

import { motion } from 'framer-motion';
import {
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  Layout,
  ImageIcon,
  Type,
  Video,
  Columns as ColumnsIcon,
} from 'lucide-react';
import { LandingPageBlock, BlockType } from '@/types/landing-page';
import { BlockEditor } from '@/components/admin/blocks/BlockEditor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LegacyBlockEditorProps {
  sections: LandingPageBlock[];
  onAddBlock: (_type: BlockType) => void;
  onRemoveSection: (_id: string) => void;
  onMoveSection: (_index: number, _direction: 'up' | 'down') => void;
  onUpdateBlock: (_id: string, _updates: Partial<LandingPageBlock>) => void;
}

export function LegacyBlockEditor({
  sections,
  onAddBlock,
  onRemoveSection,
  onMoveSection,
  onUpdateBlock,
}: LegacyBlockEditorProps) {
  return (
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
            <DropdownMenuItem onClick={() => onAddBlock('text')}>
              <Type className="mr-2 h-4 w-4" /> Texto Puro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('image')}>
              <ImageIcon className="mr-2 h-4 w-4" /> Imagem Full
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('video')}>
              <Video className="mr-2 h-4 w-4" /> Vídeo Full
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('video-autoplay')}>
              <Video className="mr-2 h-4 w-4 text-blue-400" /> Vídeo Autoplay
              (Loop)
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuLabel className="text-xs uppercase tracking-widest text-slate-500">
              Composições
            </DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onAddBlock('image-text')}>
              <div className="mr-2 flex items-center">
                <ImageIcon className="h-3 w-3" />
                <Type className="h-3 w-3" />
              </div>{' '}
              Imagem + Texto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('text-image')}>
              <div className="mr-2 flex items-center">
                <Type className="h-3 w-3" />
                <ImageIcon className="h-3 w-3" />
              </div>{' '}
              Texto + Imagem
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('image-image')}>
              <ColumnsIcon className="mr-2 h-4 w-4" /> Imagem Dupla (Grid)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('image-video')}>
              <div className="mr-2 flex items-center">
                <ImageIcon className="h-3 w-3" />
                <Video className="h-3 w-3" />
              </div>{' '}
              Imagem + Vídeo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddBlock('video-text')}>
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
                  onClick={() => onMoveSection(index, 'up')}
                  disabled={index === 0}
                  className="rounded-lg p-2 hover:bg-white/10 disabled:opacity-20"
                  title="Mover para cima"
                  aria-label="Mover para cima"
                  type="button"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => onMoveSection(index, 'down')}
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
                  onClick={() => onRemoveSection(section.id)}
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
              onChange={(updates) => onUpdateBlock(section.id, updates)}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
