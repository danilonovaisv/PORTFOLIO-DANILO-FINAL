import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useMotionGate } from '@/hooks/useMotionGate';

export function useMobileMenuAnimation(
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
) {
  const motionDisabled = useMotionGate();

  // Animation refs
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Icon animation refs
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  // Text animation refs
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  // Timelines
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // Initialize GSAP Context
  useLayoutEffect(() => {
    if (motionDisabled) return;

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll('.sm-prelayer')
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], {
        opacity: 0,
        xPercent: 100, // Sweep starting from right
        filter: 'blur(10px)',
        pointerEvents: 'none',
      });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
    });
    return () => ctx.revert();
  }, [motionDisabled]);

  const animateIcon = useCallback((opening: boolean) => {
    if (motionDisabled) return;
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to(h, { rotate: 45, duration: 0.6 }, 0)
        .to(v, { rotate: -45, duration: 0.6 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'expo.inOut' } })
        .to(h, { rotate: 0, duration: 0.45 }, 0)
        .to(v, { rotate: 90, duration: 0.45 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateText = useCallback((opening: boolean) => {
    if (motionDisabled) {
      setTextLines([opening ? 'Close' : 'Menu']);
      return;
    }

    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 1; // Reduce cycles for cleaner transition

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
    }
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.6,
      ease: 'expo.out',
    });
  }, []);

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

    if (itemEls.length)
      gsap.set(itemEls, { x: 40, opacity: 0, filter: 'blur(8px)' });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0, filter: 'blur(4px)' });
    if (socialLinks.length) gsap.set(socialLinks, { x: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // Ghost Pre-layers: Sweep "membrane" across the screen
    if (layers.length) {
      tl.to(layers, {
        opacity: 0.9,
        xPercent: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'expo.out', // Ghost Era Signature behavior
        stagger: 0.08,
      });
    }

    // Panel Reveal: Fade + Glide
    tl.to(
      panel,
      {
        opacity: 1,
        xPercent: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'expo.out',
        pointerEvents: 'auto',
      },
      layers.length ? '-=0.5' : 0
    );

    // Staggered Nav Items: Glide from right
    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'expo.out',
          stagger: 0.06,
        },
        '-=0.4'
      );
    }

    // Socials Stagger
    if (socialTitle || socialLinks.length) {
      const socialsStart = '-=0.4';
      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, filter: 'blur(0px)', duration: 0.6 },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.06,
          },
          socialsStart + '+=0.1'
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (motionDisabled) return;
    // Force reset any closing animation
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const tl = buildOpenTimeline();
    if (tl) {
      tl.play(0);
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    if (motionDisabled) return;
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(all, {
      opacity: 0,
      xPercent: 100, // Sweep back to right
      filter: 'blur(10px)',
      duration: 0.5,
      ease: 'expo.in', // Aggressive close
      pointerEvents: 'none',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = panel.querySelectorAll('.sm-panel-item');
        if (itemEls.length)
          gsap.set(itemEls, { x: 40, opacity: 0, filter: 'blur(8px)' });

        const socialsEl = socialsRef.current;
        if (socialsEl) {
          const socialTitle = socialsEl.querySelector('.sm-social-title');
          const socialLinks = Array.from(
            socialsEl.querySelectorAll('.sm-social-link')
          );
          if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
          if (socialLinks.length) gsap.set(socialLinks, { x: 20, opacity: 0 });
        }
      },
    });
  }, []);

  // Sync with external isOpen prop
  const syncState = useCallback(() => {
    if (isOpen !== openRef.current) {
      if (isOpen) {
        openRef.current = true;
        setOpen(true);
        if (!motionDisabled) {
          playOpen();
          animateIcon(true);
          animateText(true);
        } else {
          onOpen();
          setTextLines(['Close']);
        }
      } else {
        openRef.current = false;
        setOpen(false);
        if (!motionDisabled) {
          playClose();
          animateIcon(false);
          animateText(false);
        } else {
          onClose();
          setTextLines(['Menu']);
        }
      }
    }
  }, [
    isOpen,
    playOpen,
    playClose,
    animateIcon,
    animateText,
    motionDisabled,
    onClose,
    onOpen,
  ]);

  // Ensure text is always in sync with isOpen state

  // Update the toggleMenu function to ensure proper state synchronization
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;

    // Only proceed if the target state is different from current state
    if (target === openRef.current) return;

    openRef.current = target;
    setOpen(target);

    if (motionDisabled) {
      if (target) onOpen();
      else onClose();
      setTextLines([target ? 'Close' : 'Menu']);
      return;
    }

    if (target) {
      onOpen();
      playOpen();
    } else {
      onClose();
      playClose();
    }

    animateIcon(target);
    animateText(target);
  }, [
    onOpen,
    onClose,
    playOpen,
    playClose,
    animateIcon,
    animateText,
    motionDisabled,
  ]);

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
      open,
      textLines,
    },
    actions: {
      toggleMenu,
      syncState,
    },
  };
}
