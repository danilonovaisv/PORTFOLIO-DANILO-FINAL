import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter, Facebook, Globe } from 'lucide-react';
import { NAVIGATION, SOCIALS } from '@/config/navigation';
import { BRAND } from '@/config/brand';

/**
 * SiteFooter Component (Ghost Era Spec 4.7)
 *
 * Spec:
 * - Desktop: Static bar at bottom, 60px height, bg-[#0048ff]
 * - Mobile: Static stack, py-10, bg-[#0048ff]
 * - Content: Copyright (left) | Navigation + Social (right)
 */
export default function SiteFooter() {
  const socialLinks = [
    {
      label: 'Instagram',
      href: SOCIALS.instagram,
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      label: 'Facebook',
      href: SOCIALS.facebook,
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      label: 'LinkedIn',
      href: SOCIALS.linkedin,
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      label: 'Twitter',
      href: SOCIALS.twitter,
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      label: 'Portfolio',
      href: `https://${BRAND.domain}`,
      icon: <Globe className="h-4 w-4" />,
    },
  ];

  return (
    <footer
      className="w-full bg-[#0048ff] text-white z-50 relative py-10 md:py-0 md:h-[60px]"
      aria-label="Rodapé do site"
    >
      <div className="max-w-[1680px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between h-full space-y-8 md:space-y-0 text-center md:text-left">
        {/* Copyright */}
        <div className="text-[12px] md:text-sm font-medium tracking-tight order-3 md:order-1 opacity-90">
          © 2025 Danilo Novais Vilela — todos os direitos reservados
        </div>

        {/* Global Navigation & Socials */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 order-1 md:order-2">
          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center items-center gap-6">
            {NAVIGATION.footer.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] md:text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6 border-t border-white/20 pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-10">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
