"use client";

import { motion, Variants } from "motion/react";
import { ComponentPropsWithoutRef, ElementType } from "react";
import { MOTION_TOKENS } from "@/config/motion";

type SplitTextMotionProps<T extends ElementType> = {
  as?: T;
  text: string;
  active?: boolean;
  mode?: "words" | "chars";
  stagger?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function SplitTextMotion<T extends ElementType = "span">({
  as,
  text,
  active = true,
  mode = "words",
  stagger = MOTION_TOKENS.stagger.normal,
  className,
  ...props
}: SplitTextMotionProps<T>) {
  const Component = motion.create(as ?? "span") as any;
  const units = mode === "chars" ? Array.from(text) : text.split(" ");

  return (
    <Component
      className={className}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      {...props}
    >
      {units.map((unit: string, index: number) => (
        <motion.span
          key={`${unit}-${index}`}
          variants={itemVariants}
          transition={{
            duration: 0.42,
            ease: MOTION_TOKENS.ease.soft,
          }}
          className="inline-block will-change-transform"
        >
          {unit === " " ? "\u00A0" : unit}
          {mode === "words" && index < units.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </Component>
  );
}
