"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "../../lib/constants";
import GhostScene from "./HeroGhost/GhostScene";

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0.1, 0.25], [0.14, 1]);
  const videoX = useTransform(scrollYProgress, [0.1, 0.25], ["35%", "0%"]);
  const videoY = useTransform(scrollYProgress, [0.1, 0.25], ["30%", "0%"]);
  const videoRadius = useTransform(scrollYProgress, [0.1, 0.2], [12, 0]);

  return (
      <section ref={sectionRef} className="relative h-[450vh] w-full bg-[#01031c]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* GHOST */}
          <GhostScene
              onLightMove={({ x, y, intensity }) => {
                if (!textRef.current) return;

                const size = 750 + intensity * 140;

                textRef.current.style.webkitMaskImage = `
              radial-gradient(
                circle at ${x * 100}% ${y * 100}%,
                rgba(255,255,255,1) 0%,
                rgba(255,255,255,0.9) 40%,
                rgba(255,255,255,0.0) 80%
              )
            `;
                textRef.current.style.webkitMaskSize = `${size}px ${size}px`;
                textRef.current.style.maskSize = `${size}px ${size}px`;
              }}
          />

          {/* TEXTO */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div
                ref={textRef}
                className="
              text-center max-w-[90%]
              text-[#bac1db]
              uppercase
              tracking-[-0.02em]
              leading-[1.05]
              [mask-repeat:no-repeat]
              [-webkit-mask-repeat:no-repeat]
              [mask-size:0px_0px]
              [-webkit-mask-size:0px_0px]
              drop-shadow-[0_0_30px_rgba(186,193,219,0.08)]
            "
            >
              <div className="text-sm tracking-widest opacity-70 mb-6">
                [ BRAND AWARENESS ]
              </div>

              <div className="font-extrabold text-[clamp(3.5rem,9vw,7rem)]">
                <div>Design, não é</div>
                <div>só estética.</div>
              </div>

              <div className="mt-8 text-base md:text-xl font-light opacity-70">
                [ É intenção, é estratégia, é experiência. ]
              </div>
            </div>
          </div>

          {/* VIDEO */}
          <motion.div
              style={{ scale: videoScale, x: videoX, y: videoY, borderRadius: videoRadius }}
              className="absolute inset-0 z-40 overflow-hidden pointer-events-none bg-black/5"
          >
            <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </section>
  );
};

export default Hero;