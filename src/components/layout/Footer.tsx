'use client';

import React from 'react';
import Link from 'next/link';
import { NAVIGATION, SOCIALS } from '@/config/navigation';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Footer: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Helper to map social keys to icons
  const getSocialIcon = (key: string) => {
    switch (key) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'facebook': return <Facebook className="w-5 h-5" />;
      default: return null;
    }
  };

  const socialLinks = Object.entries(SOCIALS)
    .filter(([key]) => ['instagram', 'linkedin', 'twitter', 'facebook'].includes(key))
    .map(([key, url]) => ({
      platform: key,
      url,
      icon: getSocialIcon(key)
    }));

  const footerLinks = NAVIGATION.footer.links;

  // Animation only for desktop initial render
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      initial={isDesktop ? "hidden" : undefined}
      animate={isDesktop ? "visible" : undefined}
      variants={footerVariants}
      className="w-full bg-[#0057FF] text-white overflow-hidden relative lg:fixed lg:bottom-0 lg:left-0 lg:z-50 lg:border-t lg:border-white/10"
    >
      <div
        className="
          w-full max-w-[1680px] mx-auto 
          px-[clamp(24px,5vw,96px)]
          flex flex-col lg:flex-row 
          justify-between items-center 
          gap-6 lg:gap-4 
          py-10 lg:py-4
        "
      >
        {/* Copyright - Mobile: Top, Desktop: Left */}
        <div className="order-1 text-center lg:text-left text-sm text-white/90">
          <p>{NAVIGATION.footer.copyright}</p>
        </div>

        {/* Navigation & Socials - Mobile: Stacked below, Desktop: Right */}
        <div className="order-2 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Nav Links */}
          <nav>
            <ul className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
              {footerLinks.map((link) => {
                const isInternal = link.href.startsWith('/');
                const isAnchor = link.href.startsWith('#');

                const content = (
                  <span className="relative">
                    {link.label}
                    {/* Desktop Hover Underline */}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-200 origin-left group-hover:scale-x-100 hidden lg:block" />
                  </span>
                );

                const className = "group relative text-sm font-medium lowercase text-white/85 transition-opacity duration-300 hover:text-white lg:hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded px-2 py-1";

                return (
                  <li key={link.label}>
                    {isInternal && !isAnchor ? (
                      <Link href={link.href} className={className} aria-label={`Ir para ${link.label}`}>
                        {content}
                      </Link>
                    ) : (
                      <a href={link.href} className={className} aria-label={`Ir para ${link.label}`}>
                        {content}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 lg:border-l lg:border-white/20 lg:pl-6 pt-2 lg:pt-0">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 transition-all duration-300 hover:text-white lg:hover:scale-105 lg:hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-full p-1"
                aria-label={`Visitar ${social.platform}`}
              >
                <span className="sr-only">{social.platform}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
