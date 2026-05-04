'use client';

import React from 'react';

interface AlpaBlockSpacerProps {
  height?: string;
}

export function AlpaBlockSpacer({ height }: AlpaBlockSpacerProps) {
  return <div style={{ height: height || '8rem' }} />;
}
