'use client';

import { useEffect, useState } from 'react';

const DEFAULT_PORTAL_ROOT_ID = 'modal-root';

export function usePortalRoot(rootId: string = DEFAULT_PORTAL_ROOT_ID) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById(rootId));
  }, [rootId]);

  return portalRoot;
}

export default usePortalRoot;
