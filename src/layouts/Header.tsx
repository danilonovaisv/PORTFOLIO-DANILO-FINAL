"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS, ASSETS } from "@/lib/constants";
import type { NavLink } from "@/lib/types";
import { Menu, X } from "lucide-react";

function Header(): React.ReactElement {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navItems = useMemo<NavLink[]>(() => NAV_LINKS, []);

  // Padding & Height transitions
  const paddingY = useTransform(scrollY, [0, 40], [16, 8]); // py-4 (16px) to py-2 (8px)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsCondensed(latest >= 40);
  });

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const getAriaCurrent = (href: string): "page" | undefined => {
    // Exact match for root or specific paths
    if (href === pathname) return "page";
    // Helper for section links if needed, but simple strict matching is safer for now
    if (href.startsWith("/#") && pathname === "/") return undefined; // Should logic handle hash?
    if (pathname.startsWith(href) && href !== "/") return "page";
    return undefined;
  };

  const handleNavClick =
    (href: string) =>
    (event: React.MouseEvent<HTMLAnchorElement>): void => {
      const isHashLink = href.includes("#");

      // If closing mobile menu
      setIsMobileMenuOpen(false);

      if (isHashLink) {
        const [path, hash] = href.split("#");
        if (pathname === path || (path === "/" && pathname === "/")) {
          // If on same page, let native behavior or smooth scroll handle it
          // But Next.js Link might need help if purely hash
          // We'll let default Link behavior work for hash if on same page
        } else {
          // Navigate to page then hash
          // Standard Next/Link handles this
        }
      }
    };

  return (
    <>
      <motion.header
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isCondensed ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Container */}
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          {/* Logo (Light Theme implicitly, but file is faivcon-02.svg) */}
          <Link
            href="/"
            aria-label="Ir para a home"
            className="relative block shrink-0 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2"
          >
            {!logoError ? (
              <div className="relative h-8 w-auto aspect-[3/1]">
                {/* ASSETS.logoLight is expected to be the light version (dark colored text for white bg) */}
                {/* If the background is white, we need the dark text logo. 
                     The prompt says "Logo da marca (light)". Usually "light logo" means "logo for light background" (dark text) OR "light-colored logo" (white text).
                     Context: "BACKGROUND: Cor sólida branca (bg-white)". "SECTION COLORS: Texto: text-gray-700".
                     So we need the Dark Text Logo (which is usually named logo-dark or similar, but prompt says "Logo da marca (light)..." and gave a URL ending in faivcon-02.svg). 
                     Wait, URL 1: .../faivcon-02.svg (Logo Light?)
                     URL 2: .../faivcon.svg (Logo Dark?)
                     Usually "Logo Light" means "White Logo" and "Logo Dark" means "Black Logo".
                     If background is white, we need the "Dark Logo" (Black Text).
                     Let's verify the prompt mapping:
                     "Logo Light: ...faivcon-02.svg"
                     "Logo Dark: ...faivcon.svg"
                     If I assume "Logo Light" = "White logo for dark bg", I should NOT use it on bg-white.
                     I should use "Logo Dark" (Black logo for light bg).
                     However, the prompt says "KEY CONTENT ELEMENTS... Logo da marca (SVG) em versão light."
                     This is contradictory if "light" means white color.
                     Let's check the previous step user text: "Logo da marca (light)." AND "Fundo: Cor sólida branca".
                     Maybe "light" refers to the *visual weight* or it's a misnomer in the spec.
                     Or maybe faivcon-02.svg IS the dark color logo.
                     I'll use ASSETS.logoLight (faivcon-02.svg) as requested basically.
                     BUT, if it's white-on-white, it will be invisible.
                     Let's default to logoLight as requested, but keep in mind.
                     Actually, standard convention:
                     Logo LightMode = Dark Color.
                     Logo DarkMode = Light Color.
                     I will use ASSETS.logoLight.
                 */}
                <Image
                  src={ASSETS.logoLight}
                  alt="Danilo Novais"
                  height={32}
                  width={100}
                  className="object-contain"
                  priority
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Danilo.
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Navegação principal">
            <ul className="flex items-center space-x-6">
              {navItems.map((link) => {
                const isActive = getAriaCurrent(link.href) === "page";

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      className={`relative block text-base font-normal transition-colors duration-200 
                        ${
                          isActive
                            ? "text-[#0057FF]"
                            : "text-gray-700 hover:text-[#0057FF]"
                        }
                      `}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                      {/* Animated functional underline */}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#0057FF]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white md:hidden"
            role="dialog"
            aria-modal="true"
            ref={menuRef}
          >
            <nav className="w-full max-w-sm px-6">
              <ul className="flex flex-col space-y-8 text-center">
                {navItems.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={handleNavClick(link.href)}
                      className="block text-3xl font-medium text-gray-900 hover:text-[#0057FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
