'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FOOTER, SOCIALS } from '@/config/navigation';

const footerLinks = FOOTER.links;

const social = [
  { label: 'Instagram', href: SOCIALS.instagram },
  { label: 'LinkedIn', href: SOCIALS.linkedin },
  { label: 'Facebook', href: SOCIALS.facebook },
  { label: 'Twitter', href: SOCIALS.twitter },
];

function isHashHref(href: string) {
  return href.startsWith('#');
}

function scrollToHash(hashHref: string) {
  const id = hashHref.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SiteFooter() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reducedMotion ? 0.2 : 0.4 }}
        className="hidden lg:block fixed bottom-0 left-0 right-0 z-30"
        style={{ background: '#0057FF' }}
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-6 py-4 flex items-center justify-between text-white text-sm">
          <p>{FOOTER.copyright}</p>

          <nav aria-label="Links do footer" className="flex items-center gap-5">
            {footerLinks.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => {
                  if (isHashHref(l.href)) scrollToHash(l.href);
                  else window.location.href = l.href;
                }}
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {l.label}
              </button>
            ))}

            <div className="w-px h-4 bg-white/30 mx-1" />

            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                aria-label={`Abrir ${s.label}`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.footer>

      <footer
        className="lg:hidden bg-[#0057FF] text-white py-10"
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] space-y-6">
          <p className="text-sm">{FOOTER.copyright}</p>

          <nav aria-label="Links do footer">
            <ul className="space-y-3">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  {isHashHref(l.href) ? (
                    <button
                      type="button"
                      onClick={() => scrollToHash(l.href)}
                      className="hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <a
                      href={l.href}
                      className="hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap gap-4">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
