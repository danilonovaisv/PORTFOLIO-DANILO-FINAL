"use client";

import { Container } from "@/components/ui/container";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { splitTexts } from "@/config/beliefs";
import { useBeliefsScrollContext } from "./BeliefsScrollContext";

function BeliefScrollTextItem({ phrase, index }: { phrase: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0.1 });
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
      transition: { duration: 0.9, ease: [0.17, 0.55, 0.55, 1] } 
    },
    exit: {
      opacity: 0,
      y: -18,
      filter: shouldReduceMotion ? "none" : "blur(6px)",
      transition: { duration: 0.5 }
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
      <Container className="z-40">
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
    <div className="relative z-40 w-full" style={{ scrollSnapType: "y proximity" }}>
      <section className="flex h-[80vh] w-full snap-start items-center justify-center pointer-events-none">
        <Container><div className="opacity-0">Spacer inicial</div></Container>
      </section>

      {splitTexts.phrases.map((phrase, index) => (
        <BeliefScrollTextItem key={index} index={index} phrase={phrase} />
      ))}

      <section className="flex h-screen w-full snap-start items-center justify-center pointer-events-none">
        <Container><div className="opacity-0">Spacer final</div></Container>
      </section>
    </div>
  );
}
