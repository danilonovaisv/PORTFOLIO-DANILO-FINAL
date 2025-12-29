'use client';

import React from 'react';
import { NAVIGATION, SOCIALS } from '@/config/navigation';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
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

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-0 w-full z-50 bg-[#0057FF] text-white border-t border-white/10"
    >
      <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <div className="order-2 md:order-1 text-center md:text-left text-xs md:text-sm text-white/90">
          <p>{NAVIGATION.footer.copyright}</p>
        </div>

        {/* Navigation & Socials */}
        <div className="order-1 md:order-2 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
              {NAVIGATION.footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative text-xs md:text-sm font-medium lowercase text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-200 origin-left hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-4 border-l border-white/20 pl-0 md:pl-6">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-white hover:scale-110 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-full"
                aria-label={social.platform}
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
