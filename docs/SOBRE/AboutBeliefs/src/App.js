import { useRef } from "react";
import { useInView } from "framer-motion";
import "./styles.css";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Section>Um vídeo que respira.</Section>
      <Section>Uma marca que se reconhece.</Section>
      <Section>Um detalhe que fica.</Section>
      <Section>Crio para gerar presença.</Section>
      <Section>Mesmo quando não estou ali.</Section>
      <Section>Mesmo quando ninguém percebe o esforço.</Section>
    </>
  );
}
