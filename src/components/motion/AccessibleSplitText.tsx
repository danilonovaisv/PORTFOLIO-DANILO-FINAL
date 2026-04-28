'use client';

import { motion, type Variants } from 'motion/react';

/**
 * AccessibleSplitText
 *
 * Splits text into words with staggered animation while maintaining full
 * accessibility. The semantic tag (h2, p, span, etc.) receives `aria-label`
 * with the complete text, and animated inner spans are `aria-hidden`.
 *
 * When `prefersReducedMotion` is true, renders plain static text.
 *
 * @example
 * <AccessibleSplitText
 *   text="Acredito no design"
 *   tag="h2"
 *   trigger={isActive}
 *   stagger={0.03}
 *   prefersReducedMotion={shouldReduce}
 * />
 */

interface AccessibleSplitTextProps {
  /** The text content to animate */
  text: string;
  /** Semantic HTML tag to render */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'blockquote';
  /** Additional CSS classes */
  className?: string;
  /** Stagger delay between words (seconds) */
  stagger?: number;
  /** Controls animation trigger */
  trigger?: boolean;
  /** When true, renders static text without animation */
  prefersReducedMotion?: boolean;
  /** HTML id attribute for aria-labelledby linking */
  id?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (stagger: number) => ({
    opacity: 1,
    transition: { staggerChildren: stagger },
  }),
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

export function AccessibleSplitText({
  text,
  tag: Tag = 'span',
  className = '',
  stagger = 0.04,
  trigger = true,
  prefersReducedMotion = false,
  id,
}: AccessibleSplitTextProps) {
  // Reduced motion: render plain text without animation
  if (prefersReducedMotion) {
    return (
      <Tag className={className} id={id}>
        {text}
      </Tag>
    );
  }

  const words = text.split(' ');

  return (
    <Tag className={className} id={id} aria-label={text}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        custom={stagger}
        initial="hidden"
        animate={trigger ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ paddingRight: '0.25em', display: 'inline-block' }}
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
              style={{ transformOrigin: 'bottom left' }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
