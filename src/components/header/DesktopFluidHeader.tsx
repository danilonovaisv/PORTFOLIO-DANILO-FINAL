'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Logo from '@/assets/logos/LogoLight.svg';
import { useGhostEnergy } from '@/hooks/useGhostEnergy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const FluidGlass = dynamic(() => import('./webgl/FluidGlass'), { ssr: false });

// WebGL temporariamente desabilitado - função não usada
// function supportsWebGL(): boolean {
//   try {
//     const canvas = document.createElement('canvas');
//     const gl =
//       canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
//       canvas.getContext('experimental-webgl');
//     return !!gl;
//   } catch {
//     return false;
//   }
// }

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function DesktopFluidHeader() {
  const energy = useGhostEnergy();
  const reducedMotion = usePrefersReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Importante:
  // - eventSource precisa ser um HTMLElement (não ref)
  // - wrapperRef.current pode ficar `null` se não houver re-render após o mount
  //   (setState com o mesmo valor pode ser ignorado pelo React).
  // Então guardamos em state para garantir re-render.
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  // Fallback automático (sem WebGL)
  // const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setEventSource(wrapperRef.current);
    // setWebglOk(supportsWebGL());
  }, []);

  // Requisito do prompt (valores para bar mode)
  const barProps = useMemo(
    () => ({
      transmission: 1,
      roughness: 0,
      thickness: 10,
      ior: 1.15,
      color: '#ffffff',
      attenuationColor: '#ffffff',
      attenuationDistance: 0.25,
    }),
    []
  );

  const menuItems = useMemo(
    () => [
      { label: 'home', href: '/', ariaLabel: 'Ir para home' },
      { label: 'sobre', href: '/sobre', ariaLabel: 'Ir para sobre' },
      {
        label: 'portfolio showcase',
        href: '/portfolio',
        ariaLabel: 'Ir para portfolio',
      },
      { label: 'contato', href: '#contact', ariaLabel: 'Ir para contato' },
    ],
    []
  );

  // Enquanto não sabemos se WebGL existe, preferimos renderizar o HTML já com estilo “fallback”.
  // WebGL desativado temporariamente para evitar erros de runtime com createRoot duplicado e assets ausentes.
  const canShowWebGL = false;

  return (
    <div
      ref={wrapperRef}
      className="fixed top-6 left-1/2 z-40 w-[calc(100vw-2rem)] max-w-[1100px] -translate-x-1/2"
    >
      <div className="relative isolate h-[64px] overflow-hidden rounded-full drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
        {/* WebGL Glass Layer (atrás do HTML) */}
        {canShowWebGL && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <WebGLErrorBoundary>
              <FluidGlass
                barProps={barProps}
                // Captura eventos do wrapper (não do canvas), assim o cursor funciona mesmo com o nav por cima
                eventSource={eventSource}
                followPointer={!reducedMotion}
                // Importante: como usamos eventSource, o canvas pode ficar com pointer-events-none
                className="h-full w-full pointer-events-none"
              />
            </WebGLErrorBoundary>
          </div>
        )}

        {/* HTML (fallback e camada de interação) */}
        <nav
          className={[
            'pointer-events-auto relative z-10 flex h-full items-center justify-between px-6',
            'rounded-full border',
            // Quando WebGL está OK, evitamos backdrop-blur para não parecer glassmorphism fake.
            // O “glass” real vem do MeshTransmissionMaterial.
            canShowWebGL
              ? 'border-white/10 bg-transparent'
              : 'border-white/15 bg-black/35 backdrop-blur-md',
          ].join(' ')}
          role="navigation"
          aria-label="Primary"
        >
          <Link
            href="/"
            aria-label="Voltar para a home"
            className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
          >
            <Image
              src={Logo}
              alt="Danilo Novais"
              className="h-5 w-auto"
              priority
              unoptimized
            />
            <span className="sr-only">Danilo Novais</span>
          </Link>

          <div className="flex items-center gap-7 text-sm text-white/90">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.ariaLabel}
                className={[
                  'relative whitespace-nowrap rounded-full px-1 outline-none transition-opacity',
                  'hover:opacity-70 focus-visible:opacity-100',
                  'focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30',
                ].join(' ')}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* “Glow / stroke” sutil (aproxima do look da referência e do frame enviado) */}
        <div className="pointer-events-none absolute inset-0 z-1 rounded-full ring-1 ring-white/5" />
      </div>

      {/* Compat: usa ghostEnergy como brilho MUITO sutil sem mexer no material (mantém aderência ao reactbits) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0"
        style={{
          opacity: reducedMotion ? 0 : Math.min(0.12, energy * 0.12),
        }}
      />
    </div>
  );
}
