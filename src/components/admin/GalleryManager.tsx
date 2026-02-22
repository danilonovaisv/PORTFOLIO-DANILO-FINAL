'use client';

import React, { useState } from 'react';
import { GripVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

export type GalleryItem = {
    id: string;
    path?: string;
    file?: File;
    caption?: string;
};

interface GalleryManagerProps {
    items: GalleryItem[];
    onChange: (items: GalleryItem[]) => void;
}

export function GalleryManager({ items, onChange }: GalleryManagerProps) {
    const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

    const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        const newItems: GalleryItem[] = files.map(file => {
            const id = `new-${Math.random().toString(36).substr(2, 9)}`;
            setPreviewUrls(prev => ({ ...prev, [id]: URL.createObjectURL(file) }));
            return { id, file };
        });
        onChange([...items, ...newItems]);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === items.length - 1) return;

        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        onChange(newItems);
    };

    const removeItem = (id: string, index: number) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        onChange(newItems);
        if (previewUrls[id]) {
            URL.revokeObjectURL(previewUrls[id]);
            const newUrls = { ...previewUrls };
            delete newUrls[id];
            setPreviewUrls(newUrls);
        }
    };

    const isVideoUrl = (url?: string) => {
        if (!url) return false;
        return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <label className="cursor-pointer inline-flex items-center justify-center rounded-md bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400 shadow transition hover:bg-blue-500/20 border border-blue-500/20">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleAddFiles}
                    />
                    Adicionar Peças
                </label>
                <span className="text-sm text-slate-400">{items.length} peças na galeria</span>
            </div>

            <div className="space-y-2">
                {items.map((item, index) => {
                    const mediaSrc = item.file ? previewUrls[item.id] : item.path;
                    const isVid = isVideoUrl(mediaSrc) || (item.file && item.file.type.startsWith('video/'));

                    return (
                        <div key={item.id} className="flex items-center gap-4 bg-slate-900/60 border border-white/5 rounded-md p-2">
                            <div className="flex flex-col gap-1">
                                <button
                                    type="button"
                                    onClick={() => moveItem(index, 'up')}
                                    disabled={index === 0}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5"
                                >
                                    <ArrowUp size={14} className="text-white" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveItem(index, 'down')}
                                    disabled={index === items.length - 1}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5"
                                >
                                    <ArrowDown size={14} className="text-white" />
                                </button>
                            </div>

                            <div className="w-20 h-20 relative bg-black/40 rounded overflow-hidden flex-shrink-0">
                                {isVid ? (
                                    <video src={mediaSrc} className="w-full h-full object-cover" muted playsInline />
                                ) : (
                                    mediaSrc && <Image src={mediaSrc} alt="Gallery item" fill className="object-cover" unoptimized />
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                                <span className="text-xs text-slate-400 truncate">
                                    {item.file ? item.file.name : item.path}
                                </span>
                                <input
                                    type="text"
                                    placeholder="Caption (opcional)"
                                    value={item.caption || ''}
                                    onChange={e => {
                                        const newItems = [...items];
                                        newItems[index] = { ...newItems[index], caption: e.target.value };
                                        onChange(newItems);
                                    }}
                                    className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeItem(item.id, index)}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded flex-shrink-0"
                                title="Remover peça"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    );
                })}
                {items.length === 0 && (
                    <div className="p-8 text-center text-sm text-slate-500 border border-dashed border-white/10 rounded-md">
                        Nenhuma peça adicionada
                    </div>
                )}
            </div>
        </div>
    );
}
