import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import "./AboutBeliefs.css";

const phrases = [
  "Um vídeo que respira.",
  "Uma marca que se reconhece.",
  "Um detalhe que fica.",
  "Crio para gerar presença.",
  "Mesmo quando não estou ali.",
  "Mesmo quando ninguém percebe o esforço.",
];

const backgroundColors = [
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#0048ff",
];

const easing = [0.25, 0.46, 0.45, 0.94];
const totalSteps = phrases.length + 1;

const phraseVariants = {
  hidden: (reduceMotion) => ({
    opacity: reduceMotion ? 1 : 0,
    filter: reduceMotion ? "none" : "blur(12px)",
    y: reduceMotion ? 0 : 28,
  }),
  visible: {
    opacity: 1,
    filter: "none",
    y: 0,
  },
  exit: (reduceMotion) => ({
    opacity: reduceMotion ? 0 : 0,
    filter: reduceMotion ? "none" : "blur(12px)",
    y: reduceMotion ? 0 : -28,
  }),
};

export default function App() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [stepIndex, setStepIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Number.isFinite(latest) ? latest : 0;
    const nextStep = Math.min(
      totalSteps - 1,
      Math.max(0, Math.floor(progress * totalSteps)),
    );
    setStepIndex((current) => (current === nextStep ? current : nextStep));
  });

  const isFinalStep = stepIndex === totalSteps - 1;
  const currentPhrase = phrases[Math.min(stepIndex, phrases.length - 1)];
  const backgroundColor =
    backgroundColors[Math.min(stepIndex, backgroundColors.length - 1)];

  return (
    <motion.section
      ref={sectionRef}
      className="belief-section"
      initial={{ backgroundColor: backgroundColors[0] }}
      animate={{ backgroundColor }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="belief-inner">
        <div className="belief-grid">
          <motion.div
            className="belief-title"
            initial={{
              opacity: 0,
              filter: reduceMotion ? "none" : "blur(10px)",
              y: reduceMotion ? 0 : 16,
            }}
            animate={{
              opacity: 1,
              filter: "none",
              y: 0,
            }}
            transition={{ duration: 1.2, ease: easing }}
          >
            <span className="belief-title-line">
              Acredito no design que muda o dia de alguém.
            </span>
            <span className="belief-title-line">
              Não pelo choque, mas pela conexão.
            </span>
          </motion.div>

          <div className="belief-frame" aria-live="polite">
            <AnimatePresence mode="wait">
              {!isFinalStep && currentPhrase && (
                <motion.p
                  key={currentPhrase}
                  className="belief-phrase"
                  custom={reduceMotion}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={phraseVariants}
                  transition={
                    reduceMotion
                      ? { duration: 0.4 }
                      : { duration: 0.8, ease: easing }
                  }
                >
                  {currentPhrase}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isFinalStep && (
                <motion.div
                  className="belief-manifesto"
                  initial={{
                    opacity: 0,
                    scale: reduceMotion ? 1 : 0.95,
                    filter: reduceMotion ? "none" : "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "none",
                  }}
                  exit={{
                    opacity: 0,
                    scale: reduceMotion ? 1 : 0.88,
                    filter: reduceMotion ? "none" : "blur(12px)",
                  }}
                  transition={{ duration: 0.8, ease: easing }}
                >
                  <span>ISSO É</span>
                  <span>GHOST</span>
                  <span>DESIGN</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="belief-spacer" aria-hidden="true" />
    </motion.section>
  );
}
