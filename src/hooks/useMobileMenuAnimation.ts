import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMotionGate } from '@/hooks/useMotionGate';
import { MOTION_TOKENS } from '@/config/motion';
import { GSAP_GHOST_EASE } from '@/lib/motion/gsapGhostEase';

export function useMobileMenuAnimation(isOpen: boolean) {
  const motionDisabled = useMotionGate();

  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);

  const [textLines, setTextLines] = useState<string[]>(['Menu']);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (motionDisabled) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const textInner = textInnerRef.current;
      const preLayers = preContainer
        ? (Array.from(
            preContainer.querySelectorAll('.sm-prelayer')
          ) as HTMLElement[])
        : [];

      preLayerElsRef.current = preLayers;

      if (panel) {
        gsap.set([panel, ...preLayers], {
          opacity: isOpen ? 1 : 0,
          filter: isOpen ? 'blur(0px)' : 'blur(10px)',
          y: isOpen ? 0 : 18,
          pointerEvents: isOpen ? 'auto' : 'none',
        });
      }

      if (textInner) gsap.set(textInner, { yPercent: 0 });
    });

    return () => ctx.revert();
  }, [isOpen, motionDisabled]);

  const animateText = useCallback(
    (opening: boolean) => {
      if (motionDisabled) {
        setTextLines([opening ? 'Close' : 'Menu']);
        return;
      }

      const inner = textInnerRef.current;
      if (!inner) return;

      textCycleAnimRef.current?.kill();
      const currentLabel = opening ? 'Menu' : 'Close';
      const targetLabel = opening ? 'Close' : 'Menu';
      const seq = [currentLabel, targetLabel];

      setTextLines(seq);
      gsap.set(inner, { yPercent: 0 });
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -50,
        duration: MOTION_TOKENS.duration.modal,
        ease: GSAP_GHOST_EASE,
      });
    },
    [motionDisabled]
  );

  const buildOpenTimeline = useCallback(() => {
    if (motionDisabled) return null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = panel.querySelectorAll('.sm-panel-item');
    const socialsEl = socialsRef.current;
    const socialLinks = socialsEl
      ? Array.from(socialsEl.querySelectorAll('.sm-social-link'))
      : [];
    const socialTitle = socialsEl?.querySelector('.sm-social-title');

    if (itemEls.length) {
      gsap.set(itemEls, { y: 18, opacity: 0, filter: 'blur(8px)' });
    }
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, filter: 'blur(4px)' });
    if (socialLinks.length) gsap.set(socialLinks, { y: 12, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    if (layers.length) {
      tl.to(layers, {
        opacity: 0.9,
        filter: 'blur(0px)',
        y: 0,
        duration: MOTION_TOKENS.duration.normal,
        ease: GSAP_GHOST_EASE,
        stagger: 0.08,
      });
    }

    tl.to(
      panel,
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: MOTION_TOKENS.duration.normal,
        ease: GSAP_GHOST_EASE,
        pointerEvents: 'auto',
      },
      layers.length ? '-=0.5' : 0
    );

    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: MOTION_TOKENS.duration.ghostIn,
          ease: GSAP_GHOST_EASE,
          stagger: 0.06,
        },
        '-=0.4'
      );
    }

    if (socialTitle || socialLinks.length) {
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            filter: 'blur(0px)',
            duration: MOTION_TOKENS.duration.modal,
          },
          '-=0.4'
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: MOTION_TOKENS.duration.normal,
            ease: GSAP_GHOST_EASE,
            stagger: 0.06,
          },
          '-=0.3'
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [motionDisabled]);

  const playOpen = useCallback(() => {
    if (motionDisabled) return;
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    buildOpenTimeline()?.play(0);
  }, [buildOpenTimeline, motionDisabled]);

  const playClose = useCallback(() => {
    if (motionDisabled) return;

    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...preLayerElsRef.current, panel];
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to(all, {
      opacity: 0,
      filter: 'blur(10px)',
      y: 18,
      duration: MOTION_TOKENS.duration.modal,
      ease: GSAP_GHOST_EASE,
      pointerEvents: 'none',
      overwrite: 'auto',
    });
  }, [motionDisabled]);

  useLayoutEffect(() => {
    setTextLines([isOpen ? 'Close' : 'Menu']);

    if (motionDisabled) return;
    if (isOpen) playOpen();
    else playClose();

    animateText(isOpen);
  }, [animateText, isOpen, motionDisabled, playClose, playOpen]);

  return {
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
    state: {
      open: isOpen,
      textLines,
    },
  };
}
