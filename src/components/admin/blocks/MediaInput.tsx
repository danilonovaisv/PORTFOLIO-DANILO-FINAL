import { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Trash2,
} from 'lucide-react';

interface MediaInputProps {
  label: string;
  type: 'image' | 'video';
  value?: string; // URL or path
  previewUrl?: string;
  onFileSelect: (_file: File) => void;
  onUrlChange: (_url: string) => void;
  onClear: () => void;
}

export function MediaInput({
  label,
  type,
  value,
  previewUrl,
  onFileSelect,
  onUrlChange,
  onClear,
}: MediaInputProps) {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  // Detect if initial value is an external URL to set mode
  useEffect(() => {
    if (value && (value.startsWith('http') || value.startsWith('www'))) {
      // If it's a Supabase storage URL, we might consider it an "upload" technically,
      // but for editing input purposes, if it's text, it's a URL.
      // However, we usually browse files. Let's keep it simple.
      // If the user pasted a YouTube link, set to URL mode.
      if (!value.includes('supabase.co')) {
        setMode('url');
      }
    }
  }, [value]);

  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = mode === 'url' && value ? getYouTubeId(value) : null;
  const showPreview = !!previewUrl || (!!value && mode === 'url');

  // Helper to determine accurate preview source
  const displaySrc = previewUrl || value;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest text-slate-500 font-medium">
          {label}
        </label>
        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setMode('upload')}
            className={`px-2 py-1 text-xs rounded-md transition-all ${mode === 'upload' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Upload
          </button>
          <button
            onClick={() => setMode('url')}
            className={`px-2 py-1 text-xs rounded-md transition-all ${mode === 'url' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Link
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group bg-black/20">
          {youtubeId ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&modestbranding=1`}
                title="YouTube preview"
                className="w-full h-full border-none"
                allowFullScreen
              />
            </div>
          ) : type === 'image' ? (
            <div className="relative min-h-[12.5rem] max-h-[25rem] w-full flex justify-center bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displaySrc}
                alt="Preview"
                className="h-full w-auto max-h-[25rem] object-contain"
              />
            </div>
          ) : (
            <video
              src={displaySrc}
              className="w-full max-h-[25rem] object-contain"
              controls
              muted
              loop
              autoPlay
            />
          )}

          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={onClear}
              className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remover mídia"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : mode === 'upload' ? (
        <label className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/5 cursor-pointer transition-all group">
          {type === 'image' ? (
            <ImageIcon
              className="text-slate-600 mb-2 group-hover:text-blue-400 transition-colors"
              size={32}
            />
          ) : (
            <Video
              className="text-slate-600 mb-2 group-hover:text-blue-400 transition-colors"
              size={32}
            />
          )}
          <span className="text-xs text-slate-500 font-medium uppercase tracking-widest group-hover:text-blue-300">
            Escolher Arquivo
          </span>
          <input
            type="file"
            accept={type === 'image' ? 'image/*' : 'video/*'}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFileSelect(file);
            }}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
          <LinkIcon className="text-slate-500" size={18} />
          <input
            type="text"
            placeholder={
              type === 'image'
                ? 'https://exemplo.com/imagem.jpg'
                : 'Pinte aqui o link do YouTube ou .mp4'
            }
            className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-slate-600"
            onChange={(e) => onUrlChange(e.target.value)}
            value={value || ''}
          />
        </div>
      )}
    </div>
  );
}
