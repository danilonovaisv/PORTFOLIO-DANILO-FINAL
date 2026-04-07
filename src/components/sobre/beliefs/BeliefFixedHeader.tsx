'use client';

import React from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface BeliefFixedHeaderProps {
  scrollProgress?: MotionValue<number>;
  MotionHeader?: React.ElementType;
  prefersReducedMotion?: boolean;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  scrollProgress,
  MotionHeader,
  prefersReducedMotion,
}) => {
  const Header = MotionHeader ?? motion.header;
  const staticProgress = useMotionValue(1);
  const progress = scrollProgress ?? staticProgress;
  const opacity = useTransform(
    progress,
    [0, 0.04, 0.78, 0.9],
    [1, 1, 1, 0]
  );
  const x = useTransform(progress, [0, 0.08], ['100px', '0px']);
  const Content = prefersReducedMotion ? 'div' : motion.div;

  return (
    <div className="absolute inset-0 z-[30] pointer-events-none w-full">
      <Header
        style={prefersReducedMotion ? undefined : { opacity }}
        className="sticky top-0 flex h-screen pointer-events-none drop-shadow-2xl"
      >
        <div className="std-grid w-full h-full">
          <div className="flex h-full items-start pt-[20vh] md:items-center md:pt-0 justify-end col-span-12">
            <Content
              style={
                prefersReducedMotion
                  ? undefined
                  : ({ x } as unknown as React.CSSProperties)
              }
              className="flex w-full max-w-[85vw] flex-col items-end pr-[5%] text-right sm:max-w-[280px] md:max-w-[500px] md:pr-0 lg:max-w-[850px]"
            >
              <h2 className="text-white text-[clamp(1.75rem,8vw,3rem)] md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1] tracking-tighter mb-4 md:mb-12 font-black drop-shadow-lg">
                Acredito no design que
                <br />
                muda o dia de alguém.
              </h2>

              <p className="max-w-[24ch] text-white text-[clamp(0.875rem,3.8vw,1.15rem)] md:text-3xl lg:text-4xl xl:text-5xl leading-[1.2] tracking-normal font-bold drop-shadow-xl">
                Não pelo choque,
                <br />
                mas pela conexão.
              </p>
            </Content>
          </div>
        </div>
      </Header>
    </div>
  );
};
