'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'motion/react';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { useMotionGate } from '@/hooks/useMotionGate';
import { GHOST_EASE, MOTION_TOKENS } from '@/config/motion';

// =============================================================================
// StickyContactCTA — Ghost System
// CTA persistente: aparece após o Hero, oculta-se quando #contact entra na tela.
// Destrava conversão que hoje só existe no bloco final.
// =============================================================================

/** Dispara evento de analytics se gtag/dataLayer existir (no-op caso contrário). */
function trackContactClick() {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    gtag?: (..._args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  w.gtag?.('event', 'cta_click', {
    location: 'sobre_sticky',
    label: 'fale comigo',
  });
  w.dataLayer?.push({ event: 'cta_click', location: 'sobre_sticky' });
}

export function StickyContactCTA() {
  const reduceMotion = useMotionGate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Oculta quando a seção de contato fica visível (fim da página).
    let contactInView = false;
    const contact = document.getElementById('contact');

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      setVisible(pastHero && !contactInView);
    };

    const observer = contact
      ? new IntersectionObserver(
          ([entry]) => {
            contactInView = entry.isIntersecting;
            update();
          },
          { threshold: 0.15 }
        )
      : null;
    if (contact && observer) observer.observe(contact);

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: MOTION_TOKENS.duration.normal,
            ease: GHOST_EASE as [number, number, number, number],
          }}
          className="fixed bottom-6 right-4 z-[var(--z-layer-overlay)] sm:bottom-8 sm:right-8"
        >
          <AntigravityCTA
            text="fale comigo"
            href="#contact"
            size="compact"
            className="relative"
            onClick={trackContactClick}
          />
        </m.div>
      )}
    </AnimatePresence>
  );
}
