import React from 'react';
import { NAV_LINKS, SOCIALS } from '@/lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-50 bg-[#0057FF] text-white border-t border-white/20">
      <div className="container mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left text-sm text-white">
          <p>© 2025 Danilo Novais Vilela — todos os direitos reservados.</p>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium lowercase text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-200 origin-left hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-full p-2"
              aria-label={social.platform}
            >
              <span className="sr-only">{social.platform}</span>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
