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
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
        className="hidden lg:block w-full bg-primary py-10"
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] flex items-center justify-between text-white text-sm">
          <p className="opacity-80">{FOOTER.copyright}</p>

          <nav aria-label="Links do footer" className="flex items-center gap-8">
            <div className="flex gap-6 pr-6 border-r border-white/20">
              {footerLinks.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    if (isHashHref(l.href)) scrollToHash(l.href);
                    else window.location.href = l.href;
                  }}
                  className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded uppercase tracking-widest text-[10px] font-bold"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-5">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded text-xs font-medium"
                  aria-label={`Abrir ${s.label}`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </motion.footer>

      <footer
        className="lg:hidden bg-primary text-white py-12"
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-xs opacity-60 uppercase tracking-widest">Navigation</p>
            <nav aria-label="Links do footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isHashHref(l.href)) scrollToHash(l.href);
                        else window.location.href = l.href;
                      }}
                      className="text-sm font-medium hover:opacity-70"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs opacity-60 uppercase tracking-widest">Social</p>
            <div className="flex flex-wrap gap-6">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-70"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-[10px] opacity-40 uppercase tracking-widest">{FOOTER.copyright}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
