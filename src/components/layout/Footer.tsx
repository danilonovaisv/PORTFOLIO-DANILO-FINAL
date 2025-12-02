import React from 'react';
import { NAV_LINKS, SOCIALS } from '../../lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left text-sm opacity-80">
          <p>© {new Date().getFullYear()} Danilo Novais Vilela. Todos os direitos reservados.</p>
        </div>

        <nav>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href}
                  className="text-sm font-medium hover:text-white/70 transition-colors lowercase"
                >
                  {link.label}
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
                    className="text-white hover:text-white/70 transition-colors"
                    aria-label={social.platform}
                >
                    {social.icon}
                </a>
            ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;