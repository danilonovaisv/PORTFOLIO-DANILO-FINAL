'use client';

import {
  MobileMenuButton,
  MobileMenuPanel,
  MobilePreLayers,
  MobileHeaderBar,
} from '@/components/layout/header/mobile';

import React, { useCallback, useEffect } from 'react';
import { useMobileMenuAnimation } from '@/hooks/useMobileMenuAnimation';
import { useBodyLock } from '@/hooks/useBodyLock';
import type { MobileStaggeredMenuProps } from '@/components/layout/header/types';

const MENU_PANEL_ID = 'mobile-menu-panel';

function focusMainContent() {
  window.requestAnimationFrame(() => {
    const mainContent =
      document.getElementById('main-content') ??
      document.getElementById('site-content');
    mainContent?.focus({ preventScroll: true });
  });
}

export default function MobileStaggeredMenu({
  navItems,
  logoUrl,
  isLight = false,
  accentColor = '#0048FF',
  isOpen,
  onOpen,
  onClose,
  onNavigate,
  activeHref,
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
  } = useMobileMenuAnimation(isOpen);

  useBodyLock(open);

  useEffect(() => {
    const siteContent = document.getElementById('site-content');
    if (!siteContent) return;

    const previousAriaHidden = siteContent.getAttribute('aria-hidden');
    const hadInert = siteContent.hasAttribute('inert');

    if (open) {
      siteContent.setAttribute('aria-hidden', 'true');
      siteContent.setAttribute('inert', '');
    } else {
      if (previousAriaHidden === null)
        siteContent.removeAttribute('aria-hidden');
      else siteContent.setAttribute('aria-hidden', previousAriaHidden);
      if (!hadInert) siteContent.removeAttribute('inert');
    }

    return () => {
      if (previousAriaHidden === null)
        siteContent.removeAttribute('aria-hidden');
      else siteContent.setAttribute('aria-hidden', previousAriaHidden);
      if (!hadInert) siteContent.removeAttribute('inert');
    };
  }, [open]);

  useEffect(() => {
    if (open) toggleBtnRef.current?.focus({ preventScroll: true });
  }, [open, toggleBtnRef]);

  const closeAndRestoreFocus = useCallback(() => {
    onClose();
    window.requestAnimationFrame(() => {
      toggleBtnRef.current?.focus({ preventScroll: true });
    });
  }, [onClose, toggleBtnRef]);

  const handleToggle = useCallback(() => {
    if (open) {
      closeAndRestoreFocus();
    } else {
      onOpen();
      window.requestAnimationFrame(() => {
        toggleBtnRef.current?.focus({ preventScroll: true });
      });
    }
  }, [closeAndRestoreFocus, onOpen, open, toggleBtnRef]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.preventDefault();
        closeAndRestoreFocus();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeAndRestoreFocus, open]);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panelFocusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      const trigger = toggleBtnRef.current;
      const focusableElements = trigger
        ? [trigger, ...panelFocusables]
        : panelFocusables;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

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

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [open, panelRef, toggleBtnRef]);

  return (
    <div className="lg:hidden relative z-[var(--z-layer-mobile-header)]">
      <MobileHeaderBar
        logoUrl={logoUrl}
        onLogoClick={() => {
          onNavigate('/');
          onClose();
        }}
        isLight={open ? false : isLight}
        menuOpen={open}
      >
        <MobileMenuButton
          ref={toggleBtnRef}
          open={open}
          controlsId={MENU_PANEL_ID}
          textLines={textLines}
          textInnerRef={textInnerRef}
          iconRef={iconRef}
          plusHRef={plusHRef}
          plusVRef={plusVRef}
          onToggle={handleToggle}
        />
      </MobileHeaderBar>

      <MobilePreLayers ref={preLayersRef} accentColor={accentColor} />

      <MobileMenuPanel
        ref={panelRef}
        navItems={navItems}
        accentColor={accentColor}
        open={open}
        socialsRef={socialsRef}
        onNavigate={(href) => {
          onNavigate(href);
          focusMainContent();
        }}
        onClose={closeAndRestoreFocus}
        activeHref={activeHref}
      />
    </div>
  );
}
