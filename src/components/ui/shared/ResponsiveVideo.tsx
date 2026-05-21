'use client';

import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export type ResponsiveVideoProps =
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    desktopSrc: string;
    mobileSrc?: string;
    desktopPoster?: string;
    mobilePoster?: string;
    breakpoint?: string;
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
      breakpoint,
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
    const query = breakpoint || '(max-width: 767px)';
    const isMobile = useMediaQuery(query);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const hasMobile = mobileSrc && mobileSrc !== desktopSrc;

    // Garante compatibilidade de renderização SSR e hidratação dinâmica no client
    const activeSrc = mounted && isMobile && hasMobile ? mobileSrc : desktopSrc;

    const activePoster =
      mounted && isMobile && mobilePoster
        ? mobilePoster
        : desktopPoster || mobilePoster;

    const internalRef = useRef<HTMLVideoElement | null>(null);

    // Permite que componentes pais usem refs passados
    useImperativeHandle(ref, () => internalRef.current as HTMLVideoElement);

    // Recarrega e tenta tocar o vídeo sempre que o activeSrc mudar
    useEffect(() => {
      let active = true;

      const playVideo = async () => {
        if (!internalRef.current) return;
        try {
          internalRef.current.load();
          if (autoPlay) {
            await internalRef.current.play();
          }
        } catch (err: any) {
          const errName = err?.name;
          const errMsg = err?.message || '';

          const isAbort =
            errName === 'AbortError' ||
            errName === 'NS_ERROR_DOM_ABORT_ERR' ||
            errMsg.includes('AbortError') ||
            errMsg.includes('interrupted');

          // Silencia erros de interrupção/abort gerados quando o vídeo é desmontado,
          // removido ou recarregado durante a reprodução
          if (active && !isAbort) {
            console.warn(
              '[ResponsiveVideo] Autoplay falhou ou foi bloqueado pelo browser:',
              err
            );
          }
        }
      };

      if (mounted) {
        playVideo();
      }

      return () => {
        active = false;
      };
    }, [activeSrc, autoPlay, mounted]);

    return (
      <video
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
        <source src={activeSrc} />
        {children}
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
