'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldTooltip } from '@/components/admin/FieldTooltip';
import { createClientComponentClient } from '@/lib/supabase/client';
import { upsertTagAction } from '@/app/admin/(protected)/tags/actions';
import type { DbTag } from '@/types/admin';
import type { ProjectFormValues } from '@/lib/admin/schemas/project';

interface TagsSectionProps {
  availableTags: DbTag[];
  setAvailableTags: React.Dispatch<React.SetStateAction<DbTag[]>>;
  onError: (message: string | null) => void;
}

export function TagsSection({
  availableTags,
  setAvailableTags,
  onError,
}: TagsSectionProps) {
  const { setValue, watch } = useFormContext<ProjectFormValues>();
  const selectedTags = watch('tags') || [];
  const [newTagLabel, setNewTagLabel] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);

  const slugify = (value: string) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120);

  const handleCreateTag = async () => {
    const label = newTagLabel.trim();
    if (!label) return;

    const slug = slugify(label);
    if (!slug) {
      onError('SYSTEM_ERR: INVALID_TAG_LABEL — SLUG_GENERATION_FAILED');
      return;
    }

    setIsCreatingTag(true);
    onError(null);

    try {
      await upsertTagAction({
        label,
        slug,
        kind: 'category',
      });

      const supabase = createClientComponentClient();
      const { data, error: fetchError } = await supabase
        .from('portfolio_tags')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (!data) throw new Error('SYSTEM_ERR: TAG_CREATED_BUT_LOAD_FAILED');

      setAvailableTags((prev) =>
        [...prev, data].sort((a, b) =>
          a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' })
        )
      );
      setValue('tags', [...selectedTags, data.id]);
      setNewTagLabel('');
    } catch (err) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError('SYSTEM_ERR: TAG_CREATION_FAILURE');
      }
    } finally {
      setIsCreatingTag(false);
    }
  };

  return (
    <div className="space-y-4">
      <FieldTooltip
        label="System_Tags"
        description="Used for quick highlights on cards and editorial categorization."
        className="mb-2 flex items-center gap-1"
      />
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={newTagLabel}
          onChange={(event) => setNewTagLabel(event.target.value)}
          placeholder="SYSTEM_INIT_TAG_LABEL"
          className="flex-1 min-w-0 rounded-md bg-background border border-white/10 px-3 py-2 text-sm font-mono focus:border-bluePrimary/50 outline-none transition-colors"
        />
        <button
          type="button"
          onClick={handleCreateTag}
          disabled={isCreatingTag || !newTagLabel.trim()}
          className="rounded-md border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          {isCreatingTag ? 'SYSTEM_INIT...' : 'SYSTEM_CREATE_TAG'}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {availableTags.map((tag) => (
          <label
            key={tag.id}
            className="flex items-center gap-2 font-mono text-[10px] text-white/60 uppercase tracking-widest"
          >
            <input
              type="checkbox"
              value={tag.id}
              checked={selectedTags.includes(tag.id)}
              onChange={(e) => {
                const { checked, value } = e.target;
                if (checked) {
                  setValue('tags', [...selectedTags, value]);
                } else {
                  setValue(
                    'tags',
                    selectedTags.filter((id) => id !== value)
                  );
                }
              }}
            />
            {tag.label}
          </label>
        ))}
      </div>
    </div>
  );
}
