// Define standard animation tokens
export const ANIMATION_TOKENS = {
  // Duration in milliseconds
  DURATION_SHORT: 200,
  DURATION_MEDIUM: 300,
  DURATION_LONG: 500,
  
  // Easing functions
  EASING_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASING_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  
  // Stagger values
  STAGGER_CHILDREN: 50,
  STAGGER_ROOT: 100,
  
  // Distance values
  DISTANCE_SMALL: 10,
  DISTANCE_MEDIUM: 20,
  DISTANCE_LARGE: 40,
};

// Animation variants
export const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  
  slideDown: {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  
  scale: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  
  // Improved stagger variant for portfolio items
  stagger: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: ANIMATION_TOKENS.EASING_IN_OUT,
      staggerChildren: ANIMATION_TOKENS.STAGGER_CHILDREN
    }
  }
};