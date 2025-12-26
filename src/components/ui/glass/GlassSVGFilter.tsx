'use client';

import React, { useEffect, useRef } from 'react';
import { GlassSurfaceProps } from '../GlassSurface';

interface GlassSVGFilterProps extends Pick<
  GlassSurfaceProps,
  | 'width'
  | 'height'
  | 'borderRadius'
  | 'borderWidth'
  | 'brightness'
  | 'opacity'
  | 'blur'
  | 'displace'
  | 'redOffset'
  | 'greenOffset'
  | 'blueOffset'
  | 'xChannel'
  | 'yChannel'
  | 'mixBlendMode'
  | 'distortionScale'
> {
  filterId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const GlassSVGFilter: React.FC<GlassSVGFilterProps> = ({
  filterId,
  containerRef,
  width,
  height,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  distortionScale = -180,
}) => {
  const feImageRef = useRef<SVGFEImageElement>(null);
  const redChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const greenChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const blueChannelRef = useRef<SVGFEDisplacementMapElement>(null);
  const gaussianBlurRef = useRef<SVGFEGaussianBlurElement>(null);

  const generateDisplacementMap = () => {
    // Generate unique IDs for the gradients inside this specific generation
    // We can use a random suffix or rely on the fact that this is inside a function
    // But the SVG content is a string, so we need consistent IDs if we want caching.
    // However, since we return a data URI, the IDs inside it are isolated to that SVG document context usually?
    // Actually, data URI SVGs are self-contained. The IDs inside them shouldn't clash with the main DOM.

    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    // Using localized IDs for the data URI SVG to avoid conflicts if needed,
    // though data URI isolation might handle it.
    // We'll stick to simple IDs inside the data URI.
    const redGradId = 'red-grad';
    const blueGradId = 'blue-grad';

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute('href', generateDisplacementMap());
    }
  };

  useEffect(() => {
    updateDisplacementMap();
    const channels = [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ];

    channels.forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute(
          'scale',
          (distortionScale + offset).toString()
        );
        ref.current.setAttribute('xChannelSelector', xChannel!); // ! because default is set
        ref.current.setAttribute('yChannelSelector', yChannel!);
      }
    });

    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute('stdDeviation', displace.toString());
    }
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    mixBlendMode,
    containerRef, // added dependency
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
  }, [width, height]);

  return (
    <svg
      className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={filterId}
          colorInterpolationFilters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feImage
            ref={feImageRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />

          <feDisplacementMap
            ref={redChannelRef}
            in="SourceGraphic"
            in2="map"
            id="redchannel"
            result="dispRed"
          />
          <feColorMatrix
            in="dispRed"
            type="matrix"
            values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            result="red"
          />

          <feDisplacementMap
            ref={greenChannelRef}
            in="SourceGraphic"
            in2="map"
            id="greenchannel"
            result="dispGreen"
          />
          <feColorMatrix
            in="dispGreen"
            type="matrix"
            values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
            result="green"
          />

          <feDisplacementMap
            ref={blueChannelRef}
            in="SourceGraphic"
            in2="map"
            id="bluechannel"
            result="dispBlue"
          />
          <feColorMatrix
            in="dispBlue"
            type="matrix"
            values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
            result="blue"
          />

          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur
            ref={gaussianBlurRef}
            in="output"
            stdDeviation="0.7"
          />
        </filter>
      </defs>
    </svg>
  );
};
