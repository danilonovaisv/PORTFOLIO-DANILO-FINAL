'use client';

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

export type ResponsiveVideoProps =
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopSrc: string;
    mobileSrc: string;
    desktopPoster?: string;
    mobilePoster?: string;
  };

export const ResponsiveVideo = forwardRef<
  HTMLVideoElement,
  ResponsiveVideoProps
>(
  (
    {
      desktopSrc,
      mobileSrc,
      desktopPoster,
      mobilePoster,
      autoPlay = true,
      muted = true,
      loop = true,
      playsInline = true,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLVideoElement | null>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    // SSR-safe: default to desktop. useEffect swaps after hydration.
    const [activeSrc, setActiveSrc] = useState(desktopSrc);
    const [activePoster, setActivePoster] = useState<string | undefined>(
      desktopPoster
    );

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 767px)');

      const update = (e: MediaQueryList | MediaQueryListEvent) => {
        const isMobile = e.matches;
        setActiveSrc(isMobile ? mobileSrc : desktopSrc);
        setActivePoster(
          isMobile ? (mobilePoster ?? desktopPoster) : desktopPoster
        );
      };

      update(mq);
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }, [desktopSrc, mobileSrc, desktopPoster, mobilePoster]);

    return (
      // key forces a clean video remount when src switches, avoiding stale buffer
      <video
        key={activeSrc}
        ref={internalRef}
        src={activeSrc}
        poster={activePoster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        className={className}
        {...rest}
      >
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
