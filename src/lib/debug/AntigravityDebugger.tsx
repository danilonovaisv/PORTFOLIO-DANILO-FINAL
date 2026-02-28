'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AntigravityDebugger() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    // Log para confirmar que o ambiente está limpo de erros de estilo globais
    console.warn(`[Antigravity] Debugger ativo em: ${pathname}`);
  }, [pathname]);

  if (!isMounted) return null;

  // Renderiza um indicador visual discreto apenas em ambiente de desenvolvimento
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 p-2 bg-black/80 text-xs text-green-400 border border-green-900 rounded font-mono pointer-events-none">
      ● Antigravity System: Ready
    </div>
  );
}
