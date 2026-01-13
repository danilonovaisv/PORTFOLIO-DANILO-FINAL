'use client';

import React from 'react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface UploadFieldProps {
  value?: string;
  onChange: (_url: string) => void;
  label: string;
}

export function UploadField({ value, onChange, label }: UploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <div className="relative border-2 border-dashed border-gray-700 rounded-lg p-4 transition-colors hover:border-gray-500 bg-gray-900/50">
        {value ? (
          <div className="relative aspect-video w-full max-w-xs bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <Image src={value} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors z-10"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
            {uploading ? (
              <Loader2 className="animate-spin mb-2" size={24} />
            ) : (
              <Upload className="mb-2" size={24} />
            )}
            <p className="text-sm">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
              accept="image/*"
              disabled={uploading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
