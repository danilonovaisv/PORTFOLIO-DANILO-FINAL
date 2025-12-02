import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, ASSETS } from '../constants';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isOverThreshold = latest > 40;
    if (isOverThreshold !== isScrolled) {
      setIsScrolled(isOverThreshold);
    }
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-10 transition-all duration-300 ease-in-out`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          paddingTop: isScrolled ? '12px' : '24px',
          paddingBottom: isScrolled ? '12px' : '24px',
          boxShadow: isScrolled ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <a href="#hero" className="block relative z-50 group">
             <img 
              src={ASSETS.logoDark} 
              alt="Danilo Novais" 
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-bold text-dark tracking-tighter">Danilo.</span>';
              }}
             />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8 lg:space-x-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <motion.a 
                  href={link.href}
                  className="relative text-sm lg:text-base font-medium text-gray-700 hover:text-primary transition-colors duration-200 lowercase tracking-wide block py-2"
                  whileHover="hover"
                  initial="initial"
                >
                  {link.label}
                  <motion.span
                    className="absolute left-0 bottom-1 w-full h-[2px] bg-primary origin-left rounded-full"
                    variants={{
                      initial: { scaleX: 0 },
                      hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-dark p-2 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-hidden flex flex-col items-center"
          >
            <nav className="w-full max-w-sm">
              <ul className="flex flex-col space-y-6 text-center">
                {NAV_LINKS.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <a 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-semibold text-dark hover:text-primary transition-colors block lowercase"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;