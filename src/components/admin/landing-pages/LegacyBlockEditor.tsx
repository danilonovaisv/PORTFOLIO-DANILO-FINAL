'use client';

import { m } from 'framer-motion';
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

/**
 * LegacyBlockEditor
 * @deprecated Este componente pertence à arquitetura de blocos v1.
 * Use o novo 'BlockEditor' para novas implementações. Mantido para retrocompatibilidade
 * com páginas de pouso legadas.
 */
interface LegacyBlockEditorProps {
  sections: LandingPageBlock[];
  onAddBlock: (type: BlockType) => void;
  onRemoveSection: (id: string) => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onUpdateBlock: (id: string, updates: Partial<LandingPageBlock>) => void;
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
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          Block_Constructor
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 bg-bluePrimary px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-bluePrimary/90">
              <Plus size={14} /> Add_Module
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 border-white/10 bg-background text-white font-mono"
          >
            <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-white/40">
              Core_Layouts
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('text')}
            >
              <Type className="mr-2 h-3.5 w-3.5 text-bluePrimary" /> Text_Only
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('image')}
            >
              <ImageIcon className="mr-2 h-3.5 w-3.5 text-bluePrimary" />{' '}
              Full_Image
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('video')}
            >
              <Video className="mr-2 h-3.5 w-3.5 text-bluePrimary" /> Full_Video
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('video-autoplay')}
            >
              <Video className="mr-2 h-3.5 w-3.5 text-bluePrimary/80" />{' '}
              Autoplay_Video
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuLabel className="text-[9px] uppercase tracking-widest text-white/40">
              Compositions
            </DropdownMenuLabel>

            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('image-text')}
            >
              <div className="mr-2 flex items-center text-bluePrimary">
                <ImageIcon className="h-3 w-3" />
                <Type className="h-3 w-3" />
              </div>
              Image_Plus_Text
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('text-image')}
            >
              <div className="mr-2 flex items-center text-bluePrimary">
                <Type className="h-3 w-3" />
                <ImageIcon className="h-3 w-3" />
              </div>
              Text_Plus_Image
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-[10px] uppercase tracking-tight py-2.5"
              onClick={() => onAddBlock('image-image')}
            >
              <ColumnsIcon className="mr-2 h-3.5 w-3.5 text-bluePrimary" />{' '}
              Split_Image_Grid
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="min-h-[500px] space-y-12 py-8">
        {sections.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center border border-dashed border-white/5 bg-white/[0.01]">
            <Layout className="mb-4 text-white/10" size={48} />
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Constructor_Empty // Use_Add_Module
            </p>
          </div>
        )}

        {sections.map((section, index) => (
          <m.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative border border-white/5 bg-black/20 transition-all hover:border-bluePrimary/20"
          >
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold text-bluePrimary">
                  NODE_{(index + 1).toString().padStart(2, '0')}
                </span>
                <div className="h-3 w-[1px] bg-white/10" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                  {section.type.replace('-', '_')}
                </span>
              </div>

              <div className="flex items-center gap-2 opacity-30 transition-opacity group-hover:opacity-100">
                <div className="flex items-center bg-black/40 border border-white/5 p-1">
                  <button
                    onClick={() => onMoveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-white/40 hover:text-white disabled:opacity-10"
                    title="Move_Up"
                  >
                    <ChevronUp size={12} />
                  </button>
                  <button
                    onClick={() => onMoveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1.5 text-white/40 hover:text-white disabled:opacity-10"
                    title="Move_Down"
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveSection(section.id)}
                  className="bg-red-950/20 border border-red-900/20 p-2 text-red-900 hover:bg-red-600 hover:text-white transition-all"
                  title="Remove_Block"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <BlockEditor
                block={section}
                onChange={(updates) => onUpdateBlock(section.id, updates)}
              />
            </div>
          </m.div>
        ))}
      </div>
    </>
  );
}
