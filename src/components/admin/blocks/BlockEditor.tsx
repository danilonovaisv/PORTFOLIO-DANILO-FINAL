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
  const renderTextInput = (key: 'text' | 'text2', label: string) => {
    const configKey = key === 'text' ? 'textConfig' : 'textConfig2';
    // @ts-ignore - Dynamic key access
    const config = block.content[configKey] || {};

    const updateConfig = (updates: Record<string, string>) => {
      updateContent({ [configKey]: { ...config, ...updates } });
    };

    return (
      <div className="flex-1 space-y-4">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-medium flex items-center gap-2">
          <Type size={14} /> {label}
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/50 p-3 rounded-xl border border-white/5">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-slate-500 block">
              Tamanho
            </span>
            <select
              value={config.fontSize || ''}
              onChange={(e) => updateConfig({ fontSize: e.target.value })}
              className="w-full bg-slate-800 text-[11px] rounded p-1 outline-none border border-white/10 text-white"
              title="Tamanho do Texto"
            >
              <option value="">Padrão</option>
              <option value="text-xs">Extra Small</option>
              <option value="text-sm">Small</option>
              <option value="text-base">Base</option>
              <option value="text-lg">Large</option>
              <option value="text-xl">Extra Large</option>
              <option value="text-2xl">2XL</option>
              <option value="text-3xl">3XL</option>
              <option value="text-4xl">4XL</option>
              <option value="text-5xl">5XL</option>
              <option value="text-6xl">6XL</option>
              <option value="text-7xl">7XL</option>
              <option value="text-8xl">8XL</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-slate-500 block">
              Peso
            </span>
            <select
              value={config.fontWeight || ''}
              onChange={(e) => updateConfig({ fontWeight: e.target.value })}
              className="w-full bg-slate-800 text-[11px] rounded p-1 outline-none border border-white/10 text-white"
              title="Peso da Fonte"
            >
              <option value="">Padrão</option>
              <option value="font-thin">Thin</option>
              <option value="font-light">Light</option>
              <option value="font-normal">Normal</option>
              <option value="font-medium">Medium</option>
              <option value="font-semibold">SemiBold</option>
              <option value="font-bold">Bold</option>
              <option value="font-extrabold">ExtraBold</option>
              <option value="font-black">Black</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-slate-500 block">
              Alinhamento
            </span>
            <select
              value={config.textAlign || ''}
              onChange={(e) => updateConfig({ textAlign: e.target.value })}
              className="w-full bg-slate-800 text-[11px] rounded p-1 outline-none border border-white/10 text-white"
              title="Alinhamento do Texto"
            >
              <option value="">Padrão</option>
              <option value="text-left">Esquerda</option>
              <option value="text-center">Centralizado</option>
              <option value="text-right">Direita</option>
              <option value="text-justify">Justificado</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-slate-500 block">
              Cor (Hex)
            </span>
            <input
              type="text"
              value={config.color || ''}
              onChange={(e) => updateConfig({ color: e.target.value })}
              placeholder="#FFFFFF"
              className="w-full bg-slate-800 text-[11px] rounded p-1 outline-none border border-white/10 text-white placeholder-slate-600"
            />
          </div>
        </div>

        <textarea
          value={block.content[key] || ''}
          onChange={(e) => updateContent({ [key]: e.target.value })}
          className="w-full h-full min-h-[200px] bg-slate-950/50 border border-white/10 rounded-xl p-4 outline-none focus:border-blue-500/50 transition-all resize-none font-sans"
          placeholder="# Título... \n\nParágrafo com conteúdo..."
        />
      </div>
    );
  };

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
