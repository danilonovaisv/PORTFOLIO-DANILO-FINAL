"use client";

import { motion, useTransform } from "motion/react";
import { Container } from "@/components/ui/container";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";
import { splitTexts } from "@/config/beliefs";
import { SplitTextMotion } from "./SplitTextMotion";

export function BeliefFixedHeader() {
  const { scrollYProgress, shouldReduceMotion } = useBeliefsScrollContext();

  const titleOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0],
  );

  const titleX = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [60, 0, 0, -60],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col md:justify-center md:items-end justify-start pt-[20vh] md:pt-0">
      <Container>
        <motion.div
          aria-hidden="true"
          style={
            shouldReduceMotion
              ? { opacity: titleOpacity }
              : { opacity: titleOpacity, x: titleX }
          }
          className="flex w-full flex-col md:items-end items-center"
        >
          <div className="max-w-sm text-center md:text-right text-white/70 font-medium text-lg md:text-xl">
            <SplitTextMotion
              as="p"
              text={splitTexts.title1}
              mode="words"
              stagger={0.08}
              active={true}
            />
            <br />
            <SplitTextMotion
              as="p"
              text={splitTexts.title2}
              mode="words"
              stagger={0.08}
              active={true}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
