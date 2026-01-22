import { LandingPageBlock } from '@/types/landing-page';
import { MediaInput } from './MediaInput';
import { Type } from 'lucide-react';

interface BlockEditorProps {
  block: LandingPageBlock;
  onChange: (_updates: Partial<LandingPageBlock>) => void;
}

export function BlockEditor({ block, onChange }: BlockEditorProps) {
  const updateContent = (updates: Partial<typeof block.content>) => {
    onChange({ content: { ...block.content, ...updates } });
  };

  const handleFileSelect = (key: 'file' | 'file2', file: File) => {
    const previewKey = key === 'file' ? 'previewUrl' : 'previewUrl2';
    const contentKey = key === 'file' ? 'media' : 'media2';

    onChange({
      [key]: file,
      [previewKey]: URL.createObjectURL(file), // Local preview
      content: { ...block.content, [contentKey]: '' }, // Clear text value to prioritize file
    });
  };

  const handleUrlChange = (key: 'media' | 'media2', url: string) => {
    // Clear file inputs if URL is manually set
    const fileKey = key === 'media' ? 'file' : 'file2';
    const previewKey = key === 'media' ? 'previewUrl' : 'previewUrl2';

    onChange({
      [fileKey]: null,
      [previewKey]: '',
      content: { ...block.content, [key]: url },
    });
  };

  // Helper to render text input
  const renderTextInput = (key: 'text' | 'text2', label: string) => (
    <div className="flex-1 space-y-2">
      <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
        <Type size={14} /> {label}
      </label>
      <textarea
        value={block.content[key] || ''}
        onChange={(e) => updateContent({ [key]: e.target.value })}
        className="w-full h-full min-h-[200px] bg-slate-950/50 border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500/50 transition-all resize-none font-sans"
        placeholder="# Título... \n\nParágrafo com conteúdo..."
      />
    </div>
  );

  // Helper to render media input
  const renderMediaInput = (
    mediaKey: 'media' | 'media2',
    type: 'image' | 'video',
    fileKey: 'file' | 'file2',
    previewKey: 'previewUrl' | 'previewUrl2',
    label: string
  ) => (
    <div className="flex-1">
      <MediaInput
        label={label}
        type={type}
        value={block.content[mediaKey]}
        previewUrl={block[previewKey]}
        onFileSelect={(f) => handleFileSelect(fileKey, f)}
        onUrlChange={(url) => handleUrlChange(mediaKey, url)}
        onClear={() => {
          onChange({
            [fileKey]: null,
            [previewKey]: '',
            content: { ...block.content, [mediaKey]: '' },
          });
        }}
      />
    </div>
  );

  switch (block.type) {
    case 'text':
      return (
        <div className="p-4">
          {renderTextInput('text', 'Conteúdo de Texto')}
        </div>
      );

    case 'image':
      return (
        <div className="p-4">
          {renderMediaInput(
            'media',
            'image',
            'file',
            'previewUrl',
            'Imagem Full'
          )}
        </div>
      );

    case 'video':
    case 'video-autoplay': // Treat similarly in editor, logic mainly for frontend
      return (
        <div className="p-4">
          {renderMediaInput(
            'media',
            'video',
            'file',
            'previewUrl',
            'Vídeo Full'
          )}
        </div>
      );

    case 'image-text':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {renderMediaInput(
            'media',
            'image',
            'file',
            'previewUrl',
            'Imagem (Esquerda)'
          )}
          {renderTextInput('text', 'Texto (Direita)')}
        </div>
      );

    case 'text-image':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {renderTextInput('text', 'Texto (Esquerda)')}
          {renderMediaInput(
            'media',
            'image',
            'file',
            'previewUrl',
            'Imagem (Direita)'
          )}
        </div>
      );

    case 'image-image':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {renderMediaInput(
            'media',
            'image',
            'file',
            'previewUrl',
            'Imagem 01'
          )}
          {renderMediaInput(
            'media2',
            'image',
            'file2',
            'previewUrl2',
            'Imagem 02'
          )}
        </div>
      );

    case 'image-video':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {renderMediaInput('media', 'image', 'file', 'previewUrl', 'Imagem')}
          {renderMediaInput('media2', 'video', 'file2', 'previewUrl2', 'Vídeo')}
        </div>
      );

    case 'video-text':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {renderMediaInput(
            'media',
            'video',
            'file',
            'previewUrl',
            'Vídeo (Esquerda)'
          )}
          {renderTextInput('text', 'Texto (Direita)')}
        </div>
      );

    default:
      return <div className="p-4 text-red-500">Tipo de bloco desconhecido</div>;
  }
}
