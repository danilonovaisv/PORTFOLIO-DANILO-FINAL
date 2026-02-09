'use client';

import { useEffect } from 'react';
import { useContentStore } from '@/store/content.store';
import { usePathname } from 'next/navigation';

export function useGarbageCollection() {
    const pathname = usePathname();
    const clearCache = useContentStore((state) => state.clearCache);

    useEffect(() => {
        // Trigger GC when leaving Admin area
        if (!pathname.startsWith('/admin')) {
            // 5 minute timeout to clear specific caches if needed
            // For now, we rely on browser refresh for hard clear, 
            // but this hook allows explicit localized clearing.
        }

        // Cleanup on unmount of the root provider/layout
        return () => {
            // clearCache(); // strict mode
        };
    }, [pathname, clearCache]);
}
