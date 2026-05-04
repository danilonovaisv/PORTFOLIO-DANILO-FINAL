"use client";

import { Container } from "@/components/ui/container";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { splitTexts } from "@/config/beliefs";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";
import { MOTION_TOKENS } from "@/config/motion";
import { Z_INDEX } from "@/config/z-indices";

function BeliefScrollTextItem({ phrase, index }: { phrase: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: MOTION_TOKENS.reveal.beliefsMargin, amount: 0.1 });
  const { shouldReduceMotion } = useBeliefsScrollContext();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 18, 
      filter: shouldReduceMotion ? "none" : "blur(6px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: MOTION_TOKENS.duration.bg, ease: MOTION_TOKENS.ease.ghost } 
    },
    exit: {
      opacity: 0,
      y: -18,
      filter: shouldReduceMotion ? "none" : "blur(6px)",
      transition: { duration: MOTION_TOKENS.duration.textOut }
    }
  };

  // We use exit variant conceptually when it goes out of view
  // But simply using animate={isInView ? "visible" : "hidden"} achieves the toggle
  return (
    <section
      ref={ref}
      data-index={index}
      className="belief-scroll-section relative flex h-[80vh] w-full snap-center items-center justify-center md:justify-start"
    >
      <Container style={{ zIndex: Z_INDEX.beliefs.scrollText }}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "exit"}
          variants={variants}
          className="mx-auto px-6 text-center lg:max-w-[34vw] max-w-[38vw] md:text-left md:ml-0"
        >
          <h2 className="text-[clamp(2rem,8vw,3rem)] md:text-[clamp(2.8rem,5.8vw,6.3rem)] font-h1 font-bold italic text-[#4fe6ff]">
            {phrase}
          </h2>
        </motion.div>
      </Container>
    </section>
  );
}

export function BeliefScrollText() {
  return (
    <div 
      className="relative w-full" 
      style={{ scrollSnapType: "y proximity", zIndex: Z_INDEX.beliefs.scrollText }}
    >
      <section className="flex h-[80vh] w-full snap-start items-center justify-center pointer-events-none">
        <Container><div className="opacity-0">Spacer inicial</div></Container>
      </section>

      {splitTexts.phrases.map((phrase: string, index: number) => (
        <BeliefScrollTextItem key={index} index={index} phrase={phrase} />
      ))}

      <section className="flex h-screen w-full snap-start items-center justify-center pointer-events-none">
        <Container><div className="opacity-0">Spacer final</div></Container>
      </section>
    </div>
  );
}
