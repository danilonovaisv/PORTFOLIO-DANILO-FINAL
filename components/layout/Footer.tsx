import React from 'react';
import { NAV_LINKS, SOCIALS } from '../../lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0057FF] text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl">
        <div className="text-center md:text-left text-sm opacity-80 font-medium">
          <p>
            © {new Date().getFullYear()} Danilo Novais Vilela. Todos os direitos
            reservados.
          </p>
        </div>

        <nav aria-label="Navegação de rodapé">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-bold hover:text-white/70 transition-colors lowercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-sm px-1"
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
              className="text-white hover:text-white/70 transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
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
