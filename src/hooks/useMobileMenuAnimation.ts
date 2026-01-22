import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export function useMobileMenuAnimation(
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
) {
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
  const busyRef = useRef(false);

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  // Initialize GSAP Context
  useLayoutEffect(() => {
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
  }, []);

  const animateIcon = useCallback((opening: boolean) => {
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
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
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

        busyRef.current = false;
      },
    });
  }, []);

  // Sync with external isOpen prop
  const syncState = useCallback(() => {
    if (isOpen !== openRef.current) {
      if (isOpen) {
        openRef.current = true;
        setOpen(true);
        playOpen();
        animateIcon(true);
        animateText(true);
      } else {
        openRef.current = false;
        setOpen(false);
        playClose();
        animateIcon(false);
        animateText(false);
      }
    }
  }, [isOpen, playOpen, playClose, animateIcon, animateText]);

  // Ensure text is always in sync with isOpen state
  useLayoutEffect(() => {
    // Only trigger animation when state actually changes
    if (isOpen !== openRef.current) {
      if (isOpen) {
        animateText(true);
      } else {
        animateText(false);
      }
    }
    openRef.current = isOpen;
    setOpen(isOpen);
  }, [isOpen, animateText]);

  // Update the toggleMenu function to ensure proper state synchronization
  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    
    // Only proceed if the target state is different from current state
    if (target === openRef.current) return;
    
    openRef.current = target;
    setOpen(target);

    if (target) {
      onOpen();
      playOpen();
    } else {
      onClose();
      playClose();
    }

    animateIcon(target);
    animateText(target);
  }, [onOpen, onClose, playOpen, playClose, animateIcon, animateText]);

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