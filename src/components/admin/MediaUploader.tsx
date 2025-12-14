'use client';

import React from 'react';
import { UploadField } from './UploadField';
import { useRouter } from 'next/navigation';

export function MediaUploader() {
  const router = useRouter();
  return (
    <div className="max-w-md">
      <p className="text-sm text-gray-400 mb-4">
        Upload images directly to the gallery. Usually used for specific assets.
      </p>
      <UploadField
        label="Upload Image"
        value=""
        onChange={(url) => {
          if (url) {
            // Small delay to allow storage propagation if needed
            setTimeout(() => router.refresh(), 500);
          }
        }}
      />
    </div>
  );
}
