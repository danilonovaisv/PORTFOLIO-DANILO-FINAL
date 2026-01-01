'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { FOOTER, SOCIALS } from '@/config/navigation';

const footerLinks = FOOTER.links;

const social = [
  {
    label: 'Instagram',
    href: SOCIALS.instagram,
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: SOCIALS.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: 'Twitter',
    href: SOCIALS.twitter,
    icon: <Twitter className="w-5 h-5" />,
  },
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
      {/* Desktop Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0.2 : 0.8 }}
        className="hidden lg:block w-full bg-[#050505] py-16 border-t border-white/5 relative z-10"
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)] flex items-center justify-between text-white text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-[14px] font-bold tracking-tighter uppercase mb-2">
              Danilo Novais
            </span>
            <p className="opacity-30 uppercase tracking-[0.2em] text-[9px] font-mono">
              {FOOTER.copyright}
            </p>
          </div>

          <nav
            aria-label="Links do footer"
            className="flex items-center gap-16"
          >
            <div className="flex gap-10">
              {footerLinks.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => {
                    if (isHashHref(l.href)) scrollToHash(l.href);
                    else window.location.href = l.href;
                  }}
                  className="text-white/40 hover:text-[#0057FF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0057FF] rounded uppercase tracking-[0.2em] text-[10px] font-bold"
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 border-l border-white/10 pl-16">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0057FF] rounded"
                  aria-label={`Abrir ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </motion.footer>

      {/* Mobile Footer */}
      <footer
        className="lg:hidden bg-[#050505] text-white py-16 border-t border-white/5 relative z-10"
        aria-label="Footer"
      >
        <div className="max-w-[1680px] mx-auto px-8 flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            <span className="text-xl font-bold tracking-tighter uppercase">
              Danilo Novais
            </span>
            <nav aria-label="Links do footer">
              <ul className="flex flex-col gap-4">
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isHashHref(l.href)) scrollToHash(l.href);
                        else window.location.href = l.href;
                      }}
                      className="text-lg font-medium text-white/60 active:text-[#0057FF] uppercase tracking-widest text-[11px]"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-[10px] opacity-30 uppercase tracking-[0.2em] font-mono">
              Social Channels
            </p>
            <div className="flex gap-8">
              {social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 active:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-white/5">
            <p className="text-[9px] opacity-20 uppercase tracking-[0.2em] font-mono leading-relaxed">
              {FOOTER.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
