// Define consistent motion tokens
export const motionTokens = {
  durations: {
    short: 0.3,
    medium: 0.5,
    long: 0.8
  },
  easings: {
    default: 'ease-out',
    spring: 'spring(170, 26, 80, 4)',
    slow: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
  },
  distances: {
    small: 10,
    medium: 20,
    large: 40
  },
  stagger: {
    children: 0.1,
    delay: 0.1
  }
};

// Animation configuration
export const defaultAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: motionTokens.durations.medium,
    ease: motionTokens.easings.default
  }
};