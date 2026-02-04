'use client';

import {
  MobileMenuButton,
  MobileMenuPanel,
  MobilePreLayers,
  MobileHeaderBar,
} from './mobile';

import React, { useEffect } from 'react';
import { useMobileMenuAnimation } from '@/hooks/useMobileMenuAnimation';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  isLight?: boolean;
  gradient?: [string, string];
  accentColor?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (_href: string) => void;
  activeHref?: string;
  isPageActive?: boolean;
}

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  isLight = false,
  accentColor = '#0057FF',
  isOpen,
  onOpen,
  onClose,
  onNavigate,
  activeHref,
  isPageActive,
}: MobileStaggeredMenuProps) {
  const {
    refs: {
      panelRef,
      preLayersRef,

      socialsRef,
      toggleBtnRef,
      plusHRef,
      plusVRef,
      iconRef,
      textInnerRef,
    },
    state: { open, textLines },
    actions: { toggleMenu, syncState },
  } = useMobileMenuAnimation(isOpen, onOpen, onClose);

  // Sync with external isOpen prop
  useEffect(() => {
    syncState();
  }, [isOpen, syncState]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusableElements = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    firstElement?.focus();
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [open]);

  return (
    <div className="lg:hidden relative z-60">
      <MobileHeaderBar
        logoUrl={logoUrl}
        onLogoClick={onClose}
        isLight={open ? false : isLight}
      >
        <MobileMenuButton
          ref={toggleBtnRef}
          open={open}
          textLines={textLines}
          textInnerRef={textInnerRef}
          iconRef={iconRef}
          plusHRef={plusHRef}
          plusVRef={plusVRef}
          onToggle={toggleMenu}
        />
      </MobileHeaderBar>

      <MobilePreLayers ref={preLayersRef} accentColor={accentColor} />

      <MobileMenuPanel
        ref={panelRef}
        navItems={navItems}
        accentColor={accentColor}
        open={open}
        socialsRef={socialsRef}
        onNavigate={onNavigate}
        onClose={onClose}
        activeHref={activeHref}
        isPageActive={isPageActive}
      />
    </div>
  );
}
